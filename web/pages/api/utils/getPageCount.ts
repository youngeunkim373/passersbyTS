import prisma from "../../../lib/db/prisma";

export default async function getPageCount(table: string, search?: string) {
  try {
    let option = {};
    if (search) {
      option = {
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
    }

    const result: number = await prisma?.[table].count(option);

    const getPageCount =
      result % 10 === 0 ? Math.floor(result / 10) : Math.floor(result / 10) + 1;

    return getPageCount;
  } catch (error) {
    return error;
  }
}
