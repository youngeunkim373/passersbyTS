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
            res.status(200).json({ path });
            // const criteria: string = String(req.query.criteria);
            // const currentPage: number = Number(req.query.page);
            // const search: string = String(req.query?.search);
            // const take: number = Number(req.query.take);

            // const orderBy: { [k: string]: string } =
            //   criteria === "viewCount"
            //     ? { viewCount: "desc" }
            //     : criteria === "answerCount"
            //     ? {
            //         answerCount: "desc",
            //       }
            //     : { registerDate: "desc" };

            // const where = {
            //   OR: [
            //     {
            //       listTitle: {
            //         contains: search,
            //       },
            //     },
            //     {
            //       listContent: {
            //         contains: search,
            //       },
            //     },
            //   ],
            // };

            // const getPageCountResult: number | unknown = await getListPageCount(
            //   "boardlist",
            //   take,
            //   where
            // );

            // let option = {
            //   skip: Math.round((currentPage - 1) * +take),
            //   take: take,
            //   select: {
            //     listId: true,
            //     listTitle: true,
            //     writerEmail: true,
            //     listContent: true,
            //     viewCount: true,
            //     answerCount: true,
            //     statsOption: true,
            //     registerDate: true,
            //     writer: {
            //       select: {
            //         nickname: true,
            //         userImage: true,
            //       },
            //     },
            //   },
            //   orderBy: orderBy,
            //   where: where,
            // };

            // const result: BoardListKeys[] = await prisma.boardlist.findMany(
            //   option
            // );
            // console.log(result);

            // // const boardList = result.map((row) =>
            // //   typeof row.timeDiff === "bigint"
            // //     ? { ...row, timeDiff: parseInt(String(row.timeDiff)) }
            // //     : { ...row }
            // // );

            // res
            //   .status(200)
            //   .json({ boardList: result, pageCount: getPageCountResult });
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
    default:
      res.status(403).json({ error: "Please check the method again!" });
      break;
  }
}
