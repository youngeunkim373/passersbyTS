import prisma from "../../lib/prisma";

export default async function testHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const posts = await prisma.members.findMany({});
        res.status(200).json(posts);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching posts" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

/*---------- Read ----------*/
// export async function getStaticProps(context) {
//   // prisma
//   const data = await prisma.members.findMany({});
//   const members = data.map((member) => ({
//     ...member,
//   }));

//   // raw SQL
//   const dataFromSql = await prisma.$queryRaw`
//     SELECT  A.user_email    AS user_email
//            ,A.user_nicknm   AS user_nicknm
//            ,A.user_pw       AS user_pw
//            ,A.user_sex      AS user_sex
//            ,A.user_age      AS user_age
//            ,A.user_region   AS user_region
//            ,A.user_img      AS user_img
//            ,A.reg_id        AS reg_id
//            ,A.reg_date      AS reg_date
//            ,A.reg_time      AS reg_time
//       FROM Members A
//   `;
//   const membersFromSql = dataFromSql.map((memberFromSql) => ({
//     ...memberFromSql,
//   }));

//   // const newProducts = await prisma.product.createMany({
//   //   data: [
//   //     {
//   //       id: 4,
//   //       name: "테스트 모자",
//   //       description: "테스트 모자입니다.",
//   //       price: 10000,
//   //       // image: null,
//   //       category_id: 1,
//   //     },
//   //     {
//   //       id: 5,
//   //       name: "테스트 모자2",
//   //       description: "테스트 모자2입니다.",
//   //       price: 20000,
//   //       // image: null,
//   //       category_id: 2,
//   //     },
//   //   ],
//   // });

//   return {
//     props: { members, membersFromSql },
//   };
// }
