import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function members(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = req.query.path;

  switch (path) {
    case "checkEmail":
      try {
        const email = req.query.email;

        const result: { [k: string]: string | number }[] =
          await prisma.$queryRaw`
            SELECT email     FROM Members
             WHERE email = ${email}
          `;

        const checkEmail = result?.map(
          (check: { [k: string]: string | number }) => ({
            ...check,
          })
        );

        res.status(200).json(checkEmail);
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
