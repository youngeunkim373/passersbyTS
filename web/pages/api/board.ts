import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import {
  BoardListKeys,
  BoardCommentKeys,
  BoardAnswerKeys,
} from "../../types/globalTypes";
import getCommentPageCount from "./utils/getCommentPageCount";
import getListPageCount from "./utils/getListPageCount";
import { StepIconClassKey } from "@mui/material";

export default async function members(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: string = req.method!;
  const path: string = req.query.path || req.body.path;

  switch (path) {
    case "getBoardList":
      try {
        const currentPage: any = req.query.page || 1;
        const search: any = req.query?.search;
        const criteria: any = req.query?.criteria;

        const orderBy =
          criteria === "viewCount"
            ? { viewCount: "desc" }
            : criteria === "answerCount"
            ? {
                answerCount: "desc",
              }
            : { registerDate: "desc" };

        const getPageCountResult: any = await getListPageCount(
          "BoardList",
          search
        );

        let option = {
          skip: Math.round((currentPage - 1) * 10),
          take: 10,
          select: {
            listId: true,
            listTitle: true,
            writerEmail: true,
            listContent: true,
            viewCount: true,
            answerCount: true,
            registerDate: true,
            writer: {
              select: {
                nickname: true,
                userImage: true,
              },
            },
          },
          orderBy: orderBy,
          ...(search && {
            where: {
              OR: [
                {
                  listTitle: {
                    contains: search,
                  },
                },
                {
                  listContent: {
                    contains: search,
                  },
                },
              ],
            },
          }),
        };

        const result: BoardListKeys[] = await prisma.BoardList.findMany(option);

        // const boardList = result.map((row) =>
        //   typeof row.timeDiff === "bigint"
        //     ? { ...row, timeDiff: parseInt(String(row.timeDiff)) }
        //     : { ...row }
        // );

        res
          .status(200)
          .json({ boardList: result, pageCount: getPageCountResult });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
    case "getBoardDetail":
      try {
        const listId: any = req.query.listId;

        let option = {
          select: {
            listId: true,
            listTitle: true,
            writerEmail: true,
            listContent: true,
            viewCount: true,
            answerCount: true,
            registerDate: true,
            writer: {
              select: {
                nickname: true,
                userImage: true,
              },
            },
          },
          where: {
            listId: listId,
          },
        };

        const result: BoardListKeys[] = await prisma.BoardList.findUnique(
          option
        );

        res.status(200).json(result);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
    case "getBoardComments":
      try {
        const listId: any = req.query.listId;
        const currentPage: any = req.query.page;

        const getPageCountResult: any = await getCommentPageCount(
          "BoardComment",
          listId
        );

        let option = {
          skip: Math.round((currentPage - 1) * 10),
          take: 10,
          select: {
            listId: true,
            commentSequence: true,
            nestedCommentSequence: true,
            writerEmail: true,
            commentContent: true,
            registerDate: true,
            writer: {
              select: {
                nickname: true,
                userImage: true,
              },
            },
          },
          where: {
            listId: listId,
          },
          orderBy: [
            {
              commentSequence: "desc",
            },
            {
              nestedCommentSequence: "asc",
            },
          ],
        };

        const result: BoardCommentKeys[] = await prisma.BoardComment.findMany(
          option
        );

        res
          .status(200)
          .json({ comments: result, pageCount: getPageCountResult });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
    case "getBoardAnswers":
      try {
        const listId: any = req.query.listId;

        let option = {
          select: {
            answerCategory: true,
            answerSequence: true,
            answerContent: true,
          },
          where: {
            listId: listId,
          },
          orderBy: [
            {
              answerSequence: "asc",
            },
          ],
        };

        const result: BoardAnswerKeys[] = await prisma.BoardAnswer.findMany(
          option
        );

        res.status(200).json({ result });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
    case "createBoardComment":
      try {
        const name: any = req.body.name;
        const listId: any = req.body.listId;
        const commentSequence: any = req.body.commentSequence;
        const writerEmail: any = req.body.writerEmail;
        const commentContent: any = req.body.commentContent;

        const result = await prisma.$executeRaw`
          INSERT INTO BoardComment
                 (
                  listId, commentSequence, nestedCommentSequence, writerEmail, commentContent, registerId, registerDate
                 )
          VALUES
                 (
                   ${listId}
                  ,IF( ${name} = 'comment'
                      ,(SELECT IFNULL(MAX(commentSequence),0) + 1     FROM BoardComment as subtable
                         WHERE listId = ${listId})
                      ,${commentSequence}
                  )
                  ,IF( ${name} = 'comment'
                      ,0
                      ,(SELECT IFNULL(MAX(nestedCommentSequence),0) + 1     FROM BoardComment as subtable
                         WHERE listId = ${listId}
                           AND commentSequence = ${commentSequence})
                  )            
                  ,${writerEmail}
                  ,${commentContent}
                  ,${writerEmail}
                  ,NOW()
                 )
          `;

        res.status(200).json({ result });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
    case "createBoardContent":
      try {
        const listTitle: any = req.body.listTitle;
        const writerEmail: any = req.body.writerEmail;
        const listContent: any = req.body.listContent.replaceAll(
          "/upload/temporary/",
          "/upload/board/"
        );
        const answers: any = req.body.answers;

        fs.readdir("./public/upload/temporary/", (err, files) => {
          for (var i = 0; i < files.length; i++) {
            if (files[i].includes(writerEmail)) {
              fs.rename(
                `./public/upload/temporary/${files[i]}`,
                `./public/upload/board/${files[i]}`,
                function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Successfully renamed the directory.");
                  }
                }
              );
            }
          }
        });

        const newListIdResult: { newListId: string }[] = await prisma.$queryRaw`
              SELECT  CONCAT( DATE_FORMAT(CURDATE(), '%Y%m%d')
                             ,LPAD(ifnull(RIGHT(MAX(listId),5),0)+1, 5, 0))     AS newListId
                FROM BoardList
               WHERE 1 = 1
                 AND DATE_FORMAT(registerDate, '%Y-%m-%d') = CURDATE()
        `;
        const newListId = newListIdResult[0].newListId;

        const boardListResult = await prisma.$executeRaw`
              INSERT INTO BoardList
                     (
                      listId, listTitle, writerEmail, listContent, viewCount, answerCount, registerId,  registerDate   
                     )
              VALUES
                     (
                       ${newListId}
                      ,${listTitle}
                      ,${writerEmail}
                      ,${listContent}
                      ,0
                      ,0
                      ,${writerEmail}
                      ,NOW()
                     )
        `;

        for (var i = 0; i < answers.length; i++) {
          let boardAnswerResult = await prisma.$executeRaw`
                INSERT INTO BoardAnswer
                       (
                        listId, answerCategory, answerSequence, answerContent, answerSelectionCount, registerId,      registerDate   
                       )
                VALUES
                       (
                         ${newListId}
                        ,${answers[i].category}
                        ,${answers[i].sequence}
                        ,${answers[i].content}
                        ,0
                        ,${writerEmail}
                        ,NOW()
                       )
          `;
        }

        res.status(200).json({ boardListResult });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
    case "makeBoardAnswer":
      try {
        const listId: any = req.body.listId;
        const answerSequence: any = req.body.answerSequence;
        const respondentEmail: any = req.body.respondentEmail;

        const findRespondentInfo: {
          age: number;
          sex: string;
          region: string;
        }[] = await prisma.$queryRaw`
        SELECT age, sex, region     FROM Members
         WHERE 1 = 1
           AND email = ${respondentEmail}  
        `;
        const { age, sex, region } = findRespondentInfo[0];

        const logResult = await prisma.$executeRaw`
        INSERT INTO BoardAnswerLog
               (
                listId, answerSequence, respondentEmail, respondentAge, respondentSex, respondentRegion, registerId, registerDate
               )
        VALUES
               (
                 ${listId}
                ,${answerSequence}
                ,${respondentEmail}
                ,${age}
                ,${sex}
                ,${region}
                ,${respondentEmail}
                ,NOW()
               )
        `;

        const statsResult = await prisma.$executeRaw`
        INSERT INTO BoardAnswerStats
               (
                 listId
                ,answerSequence                    
                ,respondentAge_0             
                ,respondentAge_10            
                ,respondentAge_20            
                ,respondentAge_30            
                ,respondentAge_40            
                ,respondentAge_50            
                ,respondentAge_60            
                ,respondentAge_70            
                ,respondentAge_80            
                ,respondentAge_90            
                ,respondentAge_100    
                ,respondentSex_f             
                ,respondentSex_m                             
                ,respondentRegion_seoul      
                ,respondentRegion_gyeonggi   
                ,respondentRegion_gwangju    
                ,respondentRegion_daegu      
                ,respondentRegion_daejeon    
                ,respondentRegion_busan      
                ,respondentRegion_incheon    
                ,respondentRegion_ulsan      
                ,respondentRegion_sejong     
                ,respondentRegion_jeju       
                ,respondentRegion_gangwon    
                ,respondentRegion_gyeongsang 
                ,respondentRegion_jeolla     
                ,respondentRegion_chungcheong
                ,registerDate                
               )
        VALUES
               (
                 ${listId}
                ,${answerSequence}
                ,IF(${age} < 10, 1, 0)
                ,IF(${age} BETWEEN 10 AND 19, 1, 0)
                ,IF(${age} BETWEEN 20 AND 29, 1, 0)
                ,IF(${age} BETWEEN 30 AND 39, 1, 0)
                ,IF(${age} BETWEEN 40 AND 49, 1, 0)
                ,IF(${age} BETWEEN 50 AND 59, 1, 0)
                ,IF(${age} BETWEEN 60 AND 69, 1, 0)
                ,IF(${age} BETWEEN 70 AND 79, 1, 0)
                ,IF(${age} BETWEEN 80 AND 89, 1, 0)
                ,IF(${age} BETWEEN 90 AND 99, 1, 0)
                ,IF(${age} > 99, 1, 0)
                ,IF(${sex} = 'F', 1, 0)
                ,IF(${sex} = 'M', 1, 0)                    
                ,IF(${region} = 'Seoul', 1, 0)
                ,IF(${region} = 'Gyeonggi', 1, 0)
                ,IF(${region} = 'Gwangju', 1, 0)
                ,IF(${region} = 'Daegu', 1, 0)
                ,IF(${region} = 'Daejeon', 1, 0)
                ,IF(${region} = 'Busan', 1, 0)
                ,IF(${region} = 'Incheon', 1, 0)
                ,IF(${region} = 'Ulsan', 1, 0)
                ,IF(${region} = 'Sejong', 1, 0)
                ,IF(${region} = 'Jeju', 1, 0)
                ,IF(${region} = 'Gangwon', 1, 0)
                ,IF(${region} = 'Gyeongsang', 1, 0)
                ,IF(${region} = 'Jeolla', 1, 0)
                ,IF(${region} = 'Chungcheong', 1, 0)
                ,NOW()
               )
        ON DUPLICATE KEY UPDATE 
           respondentAge_0   = respondentAge_0   + IF(${age} < 10, 1, 0)
          ,respondentAge_10  = respondentAge_10  + IF(${age} BETWEEN 10 AND 19, 1, 0)
          ,respondentAge_20  = respondentAge_20  + IF(${age} BETWEEN 20 AND 29, 1, 0)
          ,respondentAge_30  = respondentAge_30  + IF(${age} BETWEEN 30 AND 39, 1, 0)
          ,respondentAge_40  = respondentAge_40  + IF(${age} BETWEEN 40 AND 49, 1, 0)
          ,respondentAge_50  = respondentAge_50  + IF(${age} BETWEEN 50 AND 59, 1, 0)
          ,respondentAge_60  = respondentAge_60  + IF(${age} BETWEEN 60 AND 69, 1, 0)
          ,respondentAge_70  = respondentAge_70  + IF(${age} BETWEEN 70 AND 79, 1, 0)
          ,respondentAge_80  = respondentAge_80  + IF(${age} BETWEEN 80 AND 89, 1, 0)
          ,respondentAge_90  = respondentAge_90  + IF(${age} BETWEEN 90 AND 99, 1, 0)
          ,respondentAge_100 = respondentAge_100 + IF(${age} > 99, 1, 0)
          ,respondentSex_f = respondentSex_f + IF(${sex} = 'F', 1, 0)
          ,respondentSex_m = respondentSex_m + IF(${sex} = 'M', 1, 0)
          ,respondentRegion_seoul       = respondentRegion_seoul       + IF(${region} = 'Seoul', 1, 0)
          ,respondentRegion_gyeonggi    = respondentRegion_gyeonggi    + IF(${region} = 'Gyeonggi', 1, 0)
          ,respondentRegion_gwangju     = respondentRegion_gwangju     + IF(${region} = 'Gwangju', 1, 0)
          ,respondentRegion_daegu       = respondentRegion_daegu       + IF(${region} = 'Daegu', 1, 0)
          ,respondentRegion_daejeon     = respondentRegion_daejeon     + IF(${region} = 'Daejeon', 1, 0)
          ,respondentRegion_busan       = respondentRegion_busan       + IF(${region} = 'Busan', 1, 0)
          ,respondentRegion_incheon     = respondentRegion_incheon     + IF(${region} = 'Incheon', 1, 0)
          ,respondentRegion_ulsan       = respondentRegion_ulsan       + IF(${region} = 'Ulsan', 1, 0)
          ,respondentRegion_sejong      = respondentRegion_sejong      + IF(${region} = 'Sejong', 1, 0)
          ,respondentRegion_jeju        = respondentRegion_jeju        + IF(${region} = 'Jeju', 1, 0)
          ,respondentRegion_gangwon     = respondentRegion_gangwon     + IF(${region} = 'Gangwon', 1, 0)
          ,respondentRegion_gyeongsang  = respondentRegion_gyeongsang  + IF(${region} = 'Gyeongsang', 1, 0)
          ,respondentRegion_jeolla      = respondentRegion_jeolla      + IF(${region} = 'Jeolla', 1, 0)
          ,respondentRegion_chungcheong = respondentRegion_chungcheong + IF(${region} = 'Chungcheong', 1, 0);                                 
        `;

        res.status(200).json({ logResult, statsResult });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
    default:
      res.status(500).json({ error: "Please check the path again!" });
      break;
  }
}
