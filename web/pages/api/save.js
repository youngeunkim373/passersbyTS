import prisma from "../../lib/prisma";

export default async function HandleSave(req, res) {
  const { user_email, user_nicknm, user_pw, user_sex, user_age, user_region } =
    req.body;
  // prisma
  const result = await prisma.members.upsert({
    create: {
      user_email: user_email,
      user_nicknm: user_nicknm,
      user_pw: user_pw,
      user_sex: user_sex,
      user_age: parseInt(user_age),
      user_region: user_region,
    },
    update: {
      user_nicknm: user_nicknm,
      user_pw: user_pw,
      user_sex: user_sex,
      user_age: parseInt(user_age),
      user_region: user_region,
    },
    where: {
      user_email: user_email,
    },
  });

  // const result = await prisma.members.create({
  //   data: {
  //     user_email: user_email,
  //     user_nicknm: user_nicknm,
  //     user_pw: user_pw,
  //     user_sex: user_sex,
  //     user_age: parseInt(user_age),
  //     user_region: user_region,
  //   },
  // });

  // raw SQL
  // const result = await prisma.$queryRaw`
  //       INSERT INTO Members
  //              (
  //                user_email
  //               ,user_nicknm
  //               ,user_pw
  //               ,user_sex
  //               ,user_age
  //               ,user_region
  //               ,reg_id
  //               ,reg_date
  //               ,reg_time
  //              )
  //       VALUES
  //              (
  //                ${user_email}
  //               ,${user_nicknm}
  //               ,${user_pw}
  //               ,${user_sex}
  //               ,${user_age}
  //               ,${user_region}
  //               ,${user_email}
  //               ,CURDATE()
  //               ,CURTIME()
  //              )
  //       ON DUPLICATE KEY
  //       UPDATE   user_nicknm = ${user_nicknm}
  //               ,user_pw = ${user_pw}
  //               ,user_sex = ${user_sex}
  //               ,user_age = ${user_age}
  //               ,user_region = ${user_region}
  //               ,reg_id = ${user_email}
  //               ,reg_date = CURDATE()
  //               ,reg_time = CURTIME()
  //     `;
  res.json(result);
}

// export async function handleSaveMember(req, res) {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const posts = await prisma.members.findMany({});
//         res.status(200).json(posts);
//       } catch (e) {
//         console.error("Request error", e);
//         res.status(500).json({ error: "Error fetching posts" });
//       }
//       break;
//     default:
//       res.setHeader("Allow", ["GET"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//       break;
//   }
// }
