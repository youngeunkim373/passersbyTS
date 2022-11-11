import prisma from "../../../lib/db/prisma";

export default async function getListPageCount(
  table: string,
  take: number,
  where?: any
): Promise<number | unknown> {
  try {
    const option = {
      where: where,
    };

    const result: number = await prisma?.[table].count(option);

    const getListPageCount =
      result % take === 0
        ? Math.floor(result / take)
        : Math.floor(result / take) + 1;

    return getListPageCount;
  } catch (error) {
    return error;
  }
}
