const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  prot: 587,
  host: "smtp.gmlail.com",
  secure: false,
  requireTLS: true,
  auth: {
    user: "youngeunkim373@gmail.com",
    pass: "fmkmcrqylhfwhbav",
  },
});

export async function sendEmail(
  from: string,
  to: string,
  subject: string,
  text: string
) {
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
      />
    </head>
    <body>
      <div>
        <table
          cellpadding="0"
          width="600px"
          cellspacing="50"
          style="border: 1px solid #eaeaea"
        >
          <tbody>
            <tr>
              <td>
                <a href="https://passersby-pvmf1a0k3-youngeunkim373.vercel.app/">
                  <img
                    src="${process.env.NEXT_PUBLIC_ENV_HOST}/images/logo+title.png"
                    width="200"
                    alt="Logo"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <h1
                  style="
                    font-family: 'Pretendard-Regular';
                    font-size: 30px;
                    font-weight: 400;
                    font-style: normal;
                  "
                >
                  ${subject}
                </h1>
                <br />
                <hr />
              </td>
            </tr>
            <tr>
              <td
                style="
                  font-family: 'Pretendard-Regular';
                  font-size: 16px;
                  font-weight: 200;
                  font-style: normal;
                  color: #5d5d5d;
                  font-family: 'Nanum Gothic', sans-serif;
                  padding-bottom: 20px;
                "
              >
                ${text}
              </td>
            </tr>
          </tbody>
        </table>
        <table cellpadding="0" width="600px" cellspacing="0">
          <tbody style="background: #eaeaea; height: 100px">
            <tr>
              <td align="center"><span style="color:#5d5d5d">Published by 0=2</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>
  
  `;

  const info = transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html,
  });

  return info;
}
