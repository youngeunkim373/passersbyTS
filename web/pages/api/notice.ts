import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  //   BoardAnswerKeys,
  //   BoardCommentKeys,
  NoticeListKeys,
} from "../../types/globalTypes";
//import getCommentPageCount from "./utils/getCommentPageCount";
import getListPageCount from "./utils/getListPageCount";

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

            const getPageCountResult: number | unknown = await getListPageCount(
              "noticelist",
              search ? search : ""
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
        default:
          res.status(500).json({ error: "Please check the path again!" });
          break;
      }
      break;
    case "POST":
    case "post":
      switch (path) {
        default:
          res.status(403).json({ error: "Please check the method again!" });
          break;
      }
  }
}
