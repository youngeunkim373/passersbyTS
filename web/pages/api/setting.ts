import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

import checkNickname from "./utils/checkNickname";
import getListPageCount from "./utils/getListPageCount";
import { BoardListKeys } from "../../types/globalTypes";

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
        case "getBoardList":
          try {
            const criteria: string = String(req.query.criteria);
            const currentPage: number = Number(req.query.page);
            const search: string = String(req.query?.search);
            const take: number = Number(req.query.take);
            const email: string = String(req.query.email);

            const orderBy: { [k: string]: string } =
              criteria === "viewCount"
                ? { viewCount: "desc" }
                : criteria === "answerCount"
                ? {
                    answerCount: "desc",
                  }
                : { registerDate: "desc" };

            const where = {
              boardAnswers: {
                some: {
                  respondentEmail: email,
                },
              },
              ...(search !== "undefined" && {
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
                ...(email !== "undefined" && {
                  writerEmail: email,
                }),
              }),
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

            const result: any = await prisma.boardlist.findMany(option);

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
        default:
          res.status(500).json({ error: "Please check the path again!" });
          break;
      }
      break;
    case "PUT":
    case "put":
      switch (path) {
        case "updateProfile":
          try {
            const email: string = req.body.email;
            const prevNickname: string = req.body.prevNickname;
            const nickname: string = req.body.nickname;
            const sex: string = req.body.sex;
            const region: string = req.body.region;

            const checkNicknameResult: any = await checkNickname(nickname);

            if (prevNickname !== nickname && checkNicknameResult > 0) {
              res
                .status(409)
                .json({ message: `${nickname} is already existed.` });
              return;
            }

            const result = await prisma.$executeRaw`
                UPDATE members
                   SET  nickname = ${nickname}
                       ,sex = ${sex}
                       ,region = ${region}
                 WHERE email = ${email}
            `;

            res.status(200).json({ nickname, sex, region });
          } catch (e) {
            console.error("Request error", e);
            res
              .status(404)
              .json({ error: "An error occured while creating data" });
          }
          break;
        default:
          res.status(500).json({ error: "Please check the path again!" });
          break;
      }
      break;
  }
}
