import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "passersby",
    port: 3306,
    user: "root",
    password: "apm6311",
    //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  });
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}
