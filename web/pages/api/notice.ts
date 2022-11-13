import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { CommentKeys, NoticeListKeys } from "../../types/globalTypes";
import getCommentPageCount from "./utils/getCommentPageCount";
import getListPageCount from "./utils/getListPageCount";
import findNoticeBucket from "./utils/findNoticeBucket";

export default async function members(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: string = req.method!;
  const path: string = req.query.path || req.body.path;

  switch (method) {
    case "GET":
    case "get":
      switch (path) {
        case "getNoticeList":
          try {
            const currentPage: number = Number(req.query.page);
            const search: string = String(req.query?.search);
            const take: number = Number(req.query.take);

            const where = {
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
              "noticelist",
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
                registerDate: true,
                writer: {
                  select: {
                    nickname: true,
                    userImage: true,
                  },
                },
              },
              orderBy: { registerDate: "desc" } as any,
              ...(search !== "undefined" && {
                where: where,
              }),
            };

            const result: NoticeListKeys[] = await prisma.noticelist.findMany(
              option
            );

            res
              .status(200)
              .json({ noticeList: result, pageCount: getPageCountResult });
          } catch (e) {
            console.error("Request error", e);
            res
              .status(404)
              .json({ error: "An error occured while fetching data!!!" });
          }
          break;
        case "getNoticeDetail":
          try {
            const listId: string = String(req.query.listId);

            let option = {
              select: {
                listId: true,
                listTitle: true,
                writerEmail: true,
                listContent: true,
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

            const result: NoticeListKeys | null =
              await prisma.noticelist.findUnique(option);

            res.status(200).json(result);
          } catch (e) {
            console.error("Request error", e);
            res
              .status(404)
              .json({ error: "An error occured while fetching data" });
          }
          break;
        case "getNoticeComments":
          try {
            const listId: string = String(req.query.listId);
            const currentPage: number = Number(req.query.page);

            const getPageCountResult: number | unknown =
              await getCommentPageCount("noticecomment", listId);

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

            const result: CommentKeys[] = await prisma.noticecomment.findMany(
              option
            );

            const totalCommentCount: number = await prisma.noticecomment.count({
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
        default:
          res.status(500).json({ error: "Please check the path again!" });
          break;
      }
      break;
    case "POST":
    case "post":
      switch (path) {
        case "createNoticeContent":
          try {
            const listTitle: string = req.body.listTitle;
            const writerEmail: string = req.body.writerEmail;
            const listContent: string = req.body.listContent;

            const newListIdResult: { newListId: string }[] =
              await prisma.$queryRaw`
              SELECT  CONCAT( DATE_FORMAT(CURDATE(), '%Y%m%d')
                             ,LPAD(ifnull(RIGHT(MAX(listId),5),0)+1, 5, 0))     AS newListId
                FROM noticelist
               WHERE 1 = 1
                 AND DATE_FORMAT(registerDate, '%Y-%m-%d') = CURDATE()
              `;
            const newListId = newListIdResult[0].newListId;

            const noticeListResult = await prisma.$executeRaw`
                        INSERT INTO noticelist
                               (
                                listId, listTitle, writerEmail, listContent, registerId,  registerDate
                               )
                        VALUES
                               (
                                 ${newListId}
                                ,${listTitle}
                                ,${writerEmail}
                                ,${listContent}
                                ,${writerEmail}
                                ,NOW()
                               )
                  `;

            res.status(200).json({ noticeListResult });
          } catch (e) {
            console.error("Request error", e);
            res.status(500).json({ error: "Error while seleting data" });
          }
          break;
        case "createNoticeComment":
          try {
            const name: string = req.body.name;
            const listId: string = String(req.body.listId);
            const commentSequence: number = req.body.commentSequence;
            const writerEmail: string = req.body.writerEmail;
            const commentContent: string = req.body.commentContent;

            const result = await prisma.$executeRaw`
                    INSERT INTO noticecomment
                           (
                            listId, commentSequence, nestedCommentSequence, writerEmail, commentContent, registerId, registerDate
                           )
                    VALUES
                           (
                             ${listId}
                            ,IF( ${name} = 'comment'
                                ,(SELECT IFNULL(MAX(commentSequence),0) + 1     FROM noticecomment as subtable
                                   WHERE listId = ${listId})
                                ,${commentSequence}
                            )
                            ,IF( ${name} = 'comment'
                                ,0
                                ,(SELECT IFNULL(MAX(nestedCommentSequence),0) + 1     FROM noticecomment as subtable
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
            res
              .status(404)
              .json({ error: "An error occured while creating data" });
          }
          break;
        default:
          res.status(403).json({ error: "Please check the method again!" });
          break;
      }
  }
}
