import prisma from "../../lib/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function allDBAccess(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result: any = await prisma.boardlist.findMany();
  res.status(200).json({ boardList: result, pageCount: 1 });
}
