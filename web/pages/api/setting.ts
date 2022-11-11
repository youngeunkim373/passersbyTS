import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import checkNickname from "./utils/checkNickname";

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
