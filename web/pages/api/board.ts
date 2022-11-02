import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import { BoardListKeys, BoardCommentKeys } from "../../types/globalTypes";
import getCommentPageCount from "./utils/getCommentPageCount";
import getListPageCount from "./utils/getListPageCount";

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
                        listId, answerSequence, answerContent, answerSelectionCount, registerId,      registerDate   
                       )
                VALUES
                       (
                         ${newListId}
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
    default:
      res.status(500).json({ error: "Please check the path again!" });
      break;
  }
}
