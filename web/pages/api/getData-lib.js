import { query } from "../../lib/localDB";

export default async function handler(req, res) {
  const id = req.body.id;
  console.log(`id: ${id}`);

  try {
    let querySql = `SELECT * FROM members`;
    const valuesParams = [id];
    if (valuesParams) {
      querySql += ` WHERE id = ?`;
    }
    // console.log(`querySql: ${querySql}`);

    const data = await query({ query: querySql, values: valuesParams });

    res.status(200).json({ members: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
