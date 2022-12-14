import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import findBoardBucket from "./utils/findBoardBucket";
import getCommentPageCount from "./utils/getCommentPageCount";
import getListPageCount from "./utils/getListPageCount";
import {
  BoardAnswerKeys,
  CommentKeys,
  BoardListKeys,
} from "../../types/globalTypes";

export default async function board(req: NextApiRequest, res: NextApiResponse) {
  const method: string = req.method!;
  const path: string = req.query.path || req.body.path;

  switch (method) {
    case "GET":
    case "get":
      switch (path) {
        case "getBoardList":
          try {
            const category: string = String(req.query?.category);
            const criteria: string = String(req.query.criteria);
            const currentPage: number = Number(req.query.page);
            const email: string = String(req.query?.email);
            const search: string = String(req.query.search);
            const take: number = Number(req.query.take);

            const orderBy: { [k: string]: string } =
              criteria === "viewCount"
                ? { viewCount: "desc" }
                : criteria === "answerCount"
                ? {
                    answerCount: "desc",
                  }
                : { registerDate: "desc" };

            const where = {
              ...(category !== "undefined" && { category: category }),
              ...(email !== "undefined" && {
                writerEmail: email,
              }),
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
            };
            const getPageCountResult: number | unknown = await getListPageCount(
              "boardlist",
              take,
              where
            );

            let option = {
              skip: Math.round((currentPage - 1) * +take),
              take: take,
              select: {
                listId: true,
                listTitle: true,
                writerEmail: true,
                listContent: true,
                viewCount: true,
                answerCount: true,
                category: true,
                statsOption: true,
                registerDate: true,
                writer: {
                  select: {
                    nickname: true,
                    userImage: true,
                  },
                },
              },
              orderBy: orderBy,
              where: where,
            };

            const result: BoardListKeys[] = await prisma.boardlist.findMany(
              option
            );

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
            res
              .status(404)
              .json({ error: "An error occured while fetching data!!!" });
          }
          break;
        case "getBoardDetail":
          try {
            const listId: string = String(req.query.listId);

            const viewResult = await prisma.$executeRaw`
                     UPDATE boardlist
                        SET  viewCount = ifnull(viewCount, 0) + 1
                      WHERE listId = ${listId}
                     `;

            let option = {
              select: {
                listId: true,
                listTitle: true,
                writerEmail: true,
                listContent: true,
                viewCount: true,
                answerCount: true,
                category: true,
                statsOption: true,
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

            const result: BoardListKeys | null =
              await prisma.boardlist.findUnique(option);

            res.status(200).json(result);
          } catch (e) {
            console.error("Request error", e);
            res
              .status(404)
              .json({ error: "An error occured while fetching data" });
          }
          break;
        case "getBoardComments":
          try {
            const listId: string = String(req.query.listId);
            const currentPage: number = Number(req.query.page);

            const getPageCountResult: number | unknown =
              await getCommentPageCount("boardcomment", listId);

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
              ] as any,
            };

            const result: CommentKeys[] = await prisma.boardcomment.findMany(
              option
            );

            const totalCommentCount: number = await prisma.boardcomment.count({
              where: {
                listId: listId,
              },
            });

            res.status(200).json({
              comments: result,
              pageCount: getPageCountResult,
              commentCount: totalCommentCount,
            });
          } catch (e) {
            console.error("Request error", e);
            res
              .status(404)
              .json({ error: "An error occured while fetching data" });
          }
          break;
        case "getBoardAnswers":
          try {
            const listId: string = String(req.query.listId);

            let option = {
              select: {
                listId: true,
                answerCategory: true,
                answerSequence: true,
                answerContent: true,
                answerSelectionCount: true,
                registerDate: true,
              },
              where: {
                listId: listId,
              },
              orderBy: {
                answerSequence: "asc",
              } as any,
            };

            const result: BoardAnswerKeys[] = await prisma.boardanswer.findMany(
              option
            );

            res.status(200).json({ result });
          } catch (e) {
            console.error("Request error", e);
            res
              .status(404)
              .json({ error: "An error occured while fetching data" });
          }
          break;
        case "getBoardStats":
          try {
            const listId: string = String(req.query.listId);
            const respondentEmail: string = String(req.query.respondentEmail);

            const StatsResult = await prisma.$queryRaw`
                 SELECT  REPLACE(A.answerContent, '&nbsp;', '')          AS answerContent
                        ,IFNULL(A.answerSelectionCount, 0)               AS answerSelectionCount
                        ,IFNULL(B.respondentSex_f, 0)                    AS respondentSex_f
                        ,IFNULL(B.respondentSex_m, 0)                    AS respondentSex_m
                        ,IFNULL(B.respondentAge_0, 0)                    AS respondentAge_0
                        ,IFNULL(B.respondentAge_10, 0)                   AS respondentAge_10
                        ,IFNULL(B.respondentAge_20, 0)                   AS respondentAge_20
                        ,IFNULL(B.respondentAge_30, 0)                   AS respondentAge_30
                        ,IFNULL(B.respondentAge_40, 0)                   AS respondentAge_40
                        ,IFNULL(B.respondentAge_50, 0)                   AS respondentAge_50
                        ,IFNULL(B.respondentAge_60, 0)                   AS respondentAge_60
                        ,IFNULL(B.respondentAge_70, 0)                   AS respondentAge_70
                        ,IFNULL(B.respondentAge_80, 0)                   AS respondentAge_80
                        ,IFNULL(B.respondentAge_90, 0)                   AS respondentAge_90
                        ,IFNULL(B.respondentAge_100, 0)                  AS respondentAge_100
                        ,IFNULL(B.respondentRegion_seoul, 0)             AS respondentRegion_seoul
                        ,IFNULL(B.respondentRegion_gyeonggi, 0)          AS respondentRegion_gyeonggi
                        ,IFNULL(B.respondentRegion_gwangju, 0)           AS respondentRegion_gwangju
                        ,IFNULL(B.respondentRegion_daegu, 0)             AS respondentRegion_daegu
                        ,IFNULL(B.respondentRegion_daejeon, 0)           AS respondentRegion_daejeon
                        ,IFNULL(B.respondentRegion_busan, 0)             AS respondentRegion_busan
                        ,IFNULL(B.respondentRegion_incheon, 0)           AS respondentRegion_incheon
                        ,IFNULL(B.respondentRegion_ulsan, 0)             AS respondentRegion_ulsan
                        ,IFNULL(B.respondentRegion_sejong, 0)            AS respondentRegion_sejong
                        ,IFNULL(B.respondentRegion_jeju, 0)              AS respondentRegion_jeju
                        ,IFNULL(B.respondentRegion_gangwon, 0)           AS respondentRegion_gangwon
                        ,IFNULL(B.respondentRegion_gyeongsang, 0)        AS respondentRegion_gyeongsang
                        ,IFNULL(B.respondentRegion_jeolla, 0)            AS respondentRegion_jeolla
                        ,IFNULL(B.respondentRegion_chungcheong, 0)       AS respondentRegion_chungcheong
                   FROM boardanswer A
                   LEFT OUTER JOIN boardanswerstats B
                           ON B.listId = A.listId
                          AND B.answerSequence = A.answerSequence
                  WHERE A.listId = ${listId}
                 `;

            const myAnswerResult: {
              answerSequence: number;
              answerContent: string;
            }[] = await prisma.$queryRaw`
                       SELECT  answerSequence
                              ,(SELECT answerContent     FROM boardanswer
                                 WHERE listId = A.listId
                                   AND answerSequence = A.answerSequence)  AS answerContent
                         FROM boardanswerlog A
                        WHERE A.listId = ${listId}
                          AND A.respondentEmail = ${respondentEmail}
                       `;

            res
              .status(200)
              .json({ StatsResult, myAnswerResult: myAnswerResult[0] });
          } catch (e) {
            console.error("Request error", e);
            res
              .status(404)
              .json({ error: "An error occured while fetching data" });
          }
          break;
        default:
          res.status(500).json({ error: "Please check the path again!" });
          break;
      }
      break;
    case "POST":
    case "post":
      switch (path) {
        case "createBoardComment":
          try {
            const name: string = req.body.name;
            const listId: string = String(req.body.listId);
            const commentSequence: number = req.body.commentSequence;
            const writerEmail: string = req.body.writerEmail;
            const commentContent: string = req.body.commentContent;

            const result = await prisma.$executeRaw`
                         INSERT INTO boardcomment
                                (
                                 listId, commentSequence, nestedCommentSequence, writerEmail, commentContent, registerId, registerDate
                                )
                         VALUES
                                (
                                  ${listId}
                                 ,IF( ${name} = 'comment'
                                     ,(SELECT IFNULL(MAX(commentSequence),0) + 1     FROM boardcomment as subtable
                                        WHERE listId = ${listId})
                                     ,${commentSequence}
                                 )
                                 ,IF( ${name} = 'comment'
                                     ,0
                                     ,(SELECT IFNULL(MAX(nestedCommentSequence),0) + 1     FROM boardcomment as subtable
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
            const listTitle: string = req.body.listTitle;
            const writerEmail: string = req.body.writerEmail;
            const listContent: string = req.body.listContent;
            const answers: {
              category: string;
              sequence: number;
              content: string;
            }[] = req.body.answers || [];
            const categoryOption: string = req.body.categoryOption;
            const statsOption: string = req.body.statsOption;

            // ????????? ??????????????? ????????? ?????? ?????????
            const strReg = new RegExp(
              "<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>",
              "gim"
            );
            const imageTagList = listContent.match(strReg);

            let imageList: string[] = [];
            for (
              var i = 0;
              i < (imageTagList === null ? 0 : imageTagList.length);
              i++
            ) {
              let image = imageTagList![i]
                .replaceAll(
                  '<img src="https://storage.cloud.google.com/passersby_board/',
                  ""
                )
                .replaceAll('">', "");
              imageList.push(image);
            }

            // temporary > board??? ????????? ?????? ?????? + temporary ?????? ??? ????????? ??????
            const bucket = findBoardBucket();

            const [files] = await bucket.getFiles({ prefix: "temporary/" });
            files.forEach((file) => {
              if (imageList.includes(file.name)) {
                bucket
                  .file(file.name)
                  .move(file.name.replace("temporary", "board"));
              } else {
                if (file.name.includes(writerEmail)) {
                  bucket.file(file.name).delete();
                }
              }
            });

            // DB??? ????????? ??????
            const newListIdResult: { newListId: string }[] =
              await prisma.$queryRaw`
                           SELECT  CONCAT( DATE_FORMAT(CURDATE(), '%Y%m%d')
                                          ,LPAD(ifnull(RIGHT(MAX(listId),5),0)+1, 5, 0))     AS newListId
                             FROM boardlist
                            WHERE 1 = 1
                              AND DATE_FORMAT(registerDate, '%Y-%m-%d') = CURDATE()
                     `;
            const newListId = newListIdResult[0].newListId;

            const boardListResult = await prisma.$executeRaw`
                           INSERT INTO boardlist
                                  (
                                   listId, listTitle, writerEmail, listContent, viewCount, answerCount, category, statsOption, registerId, registerDate
                                  )
                           VALUES
                                  (
                                    ${newListId}
                                   ,${listTitle}
                                   ,${writerEmail}
                                   ,${listContent.replaceAll(
                                     "https://storage.cloud.google.com/passersby_board/temporary/",
                                     "https://storage.cloud.google.com/passersby_board/board/"
                                   )}
                                   ,0
                                   ,0
                                   ,${categoryOption}
                                   ,${statsOption}
                                   ,${writerEmail}
                                   ,NOW()
                                  )
                     `;

            for (var i = 0; i < answers.length; i++) {
              let boardAnswerResult = await prisma.$executeRaw`
                       INSERT INTO boardanswer
                              (
                               listId, answerCategory, answerSequence, answerContent, answerSelectionCount, registerId, registerDate
                              )
                       VALUES
                              (
                                ${newListId}
                               ,${answers[i].category}
                               ,${answers[i].sequence}
                               ,${
                                 answers[i].category === "yesOrNo" &&
                                 answers[i].sequence === 0
                                   ? "??????"
                                   : answers[i].category === "yesOrNo" &&
                                     answers[i].sequence === 1
                                   ? "??????"
                                   : answers[i].content
                               }
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
            const listId: string = String(req.body.listId);
            const answerSequence: number = req.body.answerSequence;
            const respondentEmail: string = req.body.respondentEmail;

            const findRespondentInfo: {
              age: number;
              sex: string;
              region: string;
            }[] = await prisma.$queryRaw`
                     SELECT age, sex, region     FROM members
                      WHERE 1 = 1
                        AND email = ${respondentEmail}
                     `;
            const { age, sex, region } = findRespondentInfo[0];

            const logResult = await prisma.$executeRaw`
                     INSERT INTO boardanswerlog
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

            const answerResult = await prisma.$executeRaw`
                     UPDATE boardanswer
                        SET answerSelectionCount = IFNULL(answerSelectionCount, 0) + 1
                      WHERE listId = ${listId}
                        AND answerSequence = ${answerSequence}
                     `;

            const answerCountResult = await prisma.$executeRaw`
                     UPDATE boardlist
                        SET answerCount = IFNULL(answerCount, 0) + 1
                      WHERE listId = ${listId}
                     `;

            const statsResult = await prisma.$executeRaw`
                     INSERT INTO boardanswerstats
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

            res.status(200).json({ logResult, answerResult, statsResult });
          } catch (e) {
            console.error("Request error", e);
            res.status(500).json({ error: "Error while seleting data" });
          }
          break;
        default:
          res.status(404).json({ error: "Please check the path again!" });
          break;
      }
      break;
    default:
      res.status(403).json({ error: "Please check the method again!" });
      break;
  }
}
