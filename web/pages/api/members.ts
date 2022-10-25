import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../lib/utils/sendEmail";
import checkMembership from "./utils/checkMembership";
import { getSession } from "next-auth/react";

export default async function members(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path: string = req.query.path || req.body.path;

  switch (path) {
    case "sendEmail":
      try {
        const email: any = req.query.email;
        const checkMembershipResult: any = await checkMembership(email);

        let verifyNumber = null;
        if (checkMembershipResult.length === 0) {
          verifyNumber = Math.floor(100000 + Math.random() * 900000);

          const from = "youngeunkim373@gmail.com";
          const subject = "길 가는 사람들 본인인증 메일";
          const text = `길 가는 사람들 본인인증 메일입니다.<br/>
                        길 가는 사람들의 회원이 되길 희망해주셔서 감사합니다.<br/>
                        아래의 번호를 회원가입 화면의 인증번호란에 입력해주세요.<br/><br/>
                        인증번호: <b style="color: #9000ff"> ${verifyNumber}</b>
                       `;
          sendEmail(from, email, subject, text);
        }

        res.status(200).json({
          checkMembership: checkMembershipResult.length,
          verifyNumber: verifyNumber,
        });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
    case "checkMembership":
      try {
        const email: any = req.query.email;
        const radio: any = req.query.radio;

        const checkMembershipResult: any = await checkMembership(email);

        if (radio === "password" && checkMembershipResult.length > 0) {
          const from = "youngeunkim373@gmail.com";
          const subject = "길 가는 사람들 비밀번호 변경 메일";
          const text = `길 가는 사람들 비밀번호 변경 메일입니다.<br/>
                        아래의 링크로 접속하여 비밀번호를 변경해주시길 바랍니다.<br/><br/>
                        <a href="${process.env.NEXT_PUBLIC_ENV_HOST}/member/${email}">비밀번호 변경</a> 
                       `;
          sendEmail(from, email, subject, text);
        }

        res.status(200).json(checkMembershipResult.length);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
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
