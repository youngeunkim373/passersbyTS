import Head from "next/head";
import prisma from "../lib/prisma";

export default function Home({ members, membersFromSql }) {
  return (
    <div>
      <Head>
        <title>passersby</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ textAlign: "center", margin: "0 auto" }}>
        <h1>DATABASE TEST</h1>
        <div style={{ padding: "30px" }}>
          <h3>SELECT</h3>
          <h4>Prisma</h4>
          <table style={{ marginLeft: "auto", marginRight: "auto" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #444444" }}>email</th>
                <th style={{ border: "1px solid #444444" }}>nickname</th>
                <th style={{ border: "1px solid #444444" }}>sex</th>
                <th style={{ border: "1px solid #444444" }}>age</th>
                <th style={{ border: "1px solid #444444" }}>region</th>
              </tr>
            </thead>
            <tbody>
              {/* {members.map((member) => (
                <tr key={member.id}>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_email}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_nicknm}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_sex}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_age}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_region}
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
          <h4>Raw SQL</h4>
          <table style={{ marginLeft: "auto", marginRight: "auto" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #444444" }}>email</th>
                <th style={{ border: "1px solid #444444" }}>nickname</th>
                <th style={{ border: "1px solid #444444" }}>sex</th>
                <th style={{ border: "1px solid #444444" }}>age</th>
                <th style={{ border: "1px solid #444444" }}>region</th>
              </tr>
            </thead>
            <tbody>
              {/* {membersFromSql.map((member) => (
                <tr key={member.id}>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_email}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_nicknm}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_sex}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_age}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {member.user_region}
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "20px" }}>
          <h3>INSERT</h3>
          <input
            type="text"
            id="id"
            placeholder="id"
            style={{ margin: "0px 10px" }}
          />
          <input
            type="text"
            id="name"
            placeholder="name"
            style={{ margin: "0px 10px" }}
          />
          <input
            type="text"
            id="description"
            placeholder="description"
            style={{ margin: "0px 10px" }}
          />
          <button>저장</button>
        </div>
      </div>
    </div>
  );
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
