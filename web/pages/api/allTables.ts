import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function allDBAccess(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        var url = new URL(`http://localhost:3000/api/allTables/${req.url}`);

        let table: string = "";
        let fields: { [k: string]: boolean } = {};

        url.searchParams.forEach(function (value, key) {
          if (key === "table") table = value;
          if (key === "fields") {
            for (var field of value.split(",")) {
              fields[field] = true;
            }
          }
        });

        let option: { [k: string]: { [k: string]: boolean } } = {};
        if (Object.keys(fields).length > 0) option["select"] = fields;

        const result = await prisma?.[table].findMany(option);
        const members = result?.map((member: { [k: string]: string }) => ({
          ...member,
        }));

        res.status(200).json(members);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while seleting data" });
      }
      break;
    case "POST":
      try {
        const table: string = req.body.table;
        const createFields: { [k: string]: string | number } = req.body.fields;
        createFields["registerId"] = createFields.email; // 나중에 로그인한 아이디 값을 변경해야 함
        const primaryKey: { [k: string]: string | number } =
          req.body.primaryKey;
        const updateFields: { [k: string]: string | number } = {};
        Object.entries(createFields).forEach(([key, value]) => {
          if (!Object.keys(primaryKey).includes(key)) {
            updateFields[key] = value;
          }
        });

        const result = await prisma?.[table].upsert({
          create: createFields,
          update: updateFields,
          where: primaryKey,
        });

        res.status(200).json(result);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while inserting data" });
      }
      break;
    case "PUT":
      try {
        const table: string = req.body.table;
        const fields: { [k: string]: string } = req.body.fields;
        const where: { [k: string]: { [k: string]: string } } = req.body.where;

        const result = await prisma?.[table].updateMany({
          where: where,
          data: fields,
        });

        res.status(200).json(result);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while inserting data" });
      }
      break;
    case "DELETE":
      try {
        const table: string = req.body.table;
        const where: { [k: string]: { [k: string]: string } } = req.body.where;

        const result = await prisma?.[table].delete({
          where: where,
        });

        res.status(200).json(result);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while inserting data" });
      }
      break;
    default:
      res.status(500).json({ error: "Didn't select a HTTP method!" });
      break;
  }
}
