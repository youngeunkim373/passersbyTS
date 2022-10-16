import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function members(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = req.query.path;

  switch (path) {
    case "signIn":
      try {
        const email = req.query.email;
        const password = req.query.password;

        const result: { [k: string]: string | number }[] =
          await prisma.$queryRaw`
          SELECT  email, nickname, sex, age, region, userRole, userImage
            FROM Members
           WHERE email = ${email}
             AND password = ${password}
        `;
        const checkAuth = result?.map(
          (auth: { [k: string]: string | number }) => ({
            ...auth,
          })
        );

        res.status(200).json(checkAuth);
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
