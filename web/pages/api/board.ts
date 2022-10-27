import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { BoardListKeys } from "../../types/globalTypes";
import getPageCount from "./utils/getPageCount";

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

        const getPageCountResult: any = await getPageCount(search);

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

        const boardList = result.map((row) =>
          typeof row.timeDiff === "bigint"
            ? { ...row, timeDiff: parseInt(String(row.timeDiff)) }
            : { ...row }
        );

        res
          .status(200)
          .json({ boardList: boardList, pageCount: getPageCountResult });
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
