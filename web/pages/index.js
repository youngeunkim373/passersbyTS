import { useState } from "react";
import Head from "next/head";
import router from "next/router";
import prisma from "../lib/prisma";

/*---------- Read ----------*/
export async function getServerSideProps(context) {
  // prisma
  const data = await prisma.members.findMany({});
  const members = data.map((member) => ({
    ...member,
  }));

  // raw SQL
  const dataFromSql = await prisma.$queryRaw`
    SELECT  A.user_email    AS user_email
           ,A.user_nicknm   AS user_nicknm
           ,A.user_pw       AS user_pw
           ,A.user_sex      AS user_sex
           ,A.user_age      AS user_age
           ,A.user_region   AS user_region
           ,A.user_img      AS user_img
           ,A.reg_id        AS reg_id
           ,A.reg_date      AS reg_date
           ,A.reg_time      AS reg_time
      FROM Members A
  `;
  const membersFromSql = dataFromSql.map((memberFromSql) => ({
    ...memberFromSql,
  }));

  return {
    props: { members, membersFromSql },
  };
}

export default function Home({ members, membersFromSql }) {
  const [data, setData] = useState({
    user_email: "",
    user_nicknm: "",
    user_pw: "",
    user_sex: "",
    user_age: "",
    user_region: "",
  });
  const { user_email, user_nicknm, user_pw, user_sex, user_age, user_region } =
    data;

  const [checkedData, setCheckedData] = useState([]);

  /*---------- create / update ----------*/
  const onSaveTextChange = (e) => {
    e.preventDefault();
    const { value, id } = e.target;
    setData({ ...data, [id]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = {
        user_email,
        user_nicknm,
        user_pw,
        user_sex,
        user_age,
        user_region,
      };
      await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  /*---------- delete ----------*/
  const onCheckboxClick = (e) => {
    const { id, checked } = e.target;
    if (checked === true) {
      setCheckedData([...checkedData, id]);
    } else {
      setCheckedData(checkedData.filter((checked) => checked !== id));
    }
  };

  const deleteData = async () => {
    try {
      await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkedData),
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

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
              {members.map((member) => (
                <tr key={member.user_email}>
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
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "20px" }}>
          <h3>INSERT / UPDATE</h3>
          <form onSubmit={submitData} method="put">
            <input
              type="text"
              id="user_email"
              placeholder="email"
              style={{ margin: "0px 10px" }}
              value={user_email}
              onChange={onSaveTextChange}
            />
            <input
              type="text"
              id="user_nicknm"
              placeholder="nickname"
              style={{ margin: "0px 10px" }}
              value={user_nicknm}
              onChange={onSaveTextChange}
            />
            <input
              type="text"
              id="user_pw"
              placeholder="password"
              style={{ margin: "0px 10px" }}
              value={user_pw}
              onChange={onSaveTextChange}
            />
            <br />
            <input
              type="text"
              id="user_sex"
              placeholder="sex"
              style={{ margin: "0px 10px" }}
              value={user_sex}
              onChange={onSaveTextChange}
            />
            <input
              type="text"
              id="user_age"
              placeholder="age"
              style={{ margin: "0px 10px" }}
              value={user_age}
              onChange={onSaveTextChange}
            />
            <input
              type="text"
              id="user_region"
              placeholder="region"
              style={{ margin: "0px 10px" }}
              value={user_region}
              onChange={onSaveTextChange}
            />
            <br />
            <button type="submit" style={{ margin: "10px" }}>
              저장
            </button>
          </form>
        </div>
        <div style={{ padding: "30px" }}>
          <h3>DELETE</h3>
          <h4>Raw SQL</h4>
          <table style={{ marginLeft: "auto", marginRight: "auto" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #444444" }}>√</th>
                <th style={{ border: "1px solid #444444" }}>email</th>
                <th style={{ border: "1px solid #444444" }}>nickname</th>
                <th style={{ border: "1px solid #444444" }}>sex</th>
                <th style={{ border: "1px solid #444444" }}>age</th>
                <th style={{ border: "1px solid #444444" }}>region</th>
              </tr>
            </thead>
            <tbody>
              {membersFromSql.map((member) => (
                <tr key={member.user_email}>
                  <td style={{ border: "1px solid #444444" }}>
                    <input
                      id={member.user_email}
                      onClick={onCheckboxClick}
                      type="checkbox"
                    />
                  </td>
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
              ))}
            </tbody>
          </table>
          <br />
          <button onClick={deleteData} style={{ margin: "10px" }}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
