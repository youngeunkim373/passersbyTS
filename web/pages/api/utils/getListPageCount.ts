import prisma from "../../../lib/db/prisma";

export default async function getListPageCount(
  table: string,
  search?: string
): Promise<number | unknown> {
  try {
    const option = {
      where: {
        OR: [
          {
            listTitle: {
              contains: search,
            },
          },
          {
            listContent: {
              contains: search,
            },
          },
        ],
      },
    };

    const result: number = await prisma?.[table].count(option);

    const getListPageCount =
      result % 10 === 0 ? Math.floor(result / 10) : Math.floor(result / 10) + 1;

    return getListPageCount;
  } catch (error) {
    return error;
  }
}
