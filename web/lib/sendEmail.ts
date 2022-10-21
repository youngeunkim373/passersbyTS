const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail", //사용하고자 하는 서비스
  prot: 587,
  host: "smtp.gmlail.com",
  secure: false,
  requireTLS: true,
  auth: {
    user: "youngeunkim373@gmail.com", //gmail주소입력
    pass: "fmkmcrqylhfwhbav",
  },
});

export async function sendEmail(
  from: string,
  to: string,
  subject: string,
  text: string
) {
  const info = transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: text,
  });

  return info;
}
