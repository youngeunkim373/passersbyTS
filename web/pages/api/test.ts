import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function allDBAccess(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const table = "BoardList";
  const result: any = await prisma?.[table].findMany({});
  res.status(200).json({ boardList: result });
}
