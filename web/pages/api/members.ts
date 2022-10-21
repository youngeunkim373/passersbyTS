import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../lib/sendEmail";

export default async function members(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = req.query.path;

  switch (path) {
    case "sendEmail":
      try {
        const email: any = req.query.email;

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

        let verifyNumber = null;
        if (checkEmail.length === 0) {
          verifyNumber = Math.floor(100000 + Math.random() * 900000);

          const from = "youngeunkim373@gmail.com";
          const subject = "길 가는 사람들 본인인증 메일";
          const text = `길 가는 사람들 본인인증 메일입니다. 아래의 번호를 회원가입 창의 인증번호란에 입력해주세요.
                       ${verifyNumber}`;
          sendEmail(from, email, subject, text);
        }

        res
          .status(200)
          .json({ checkEmail: checkEmail.length, verifyNumber: verifyNumber });
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
