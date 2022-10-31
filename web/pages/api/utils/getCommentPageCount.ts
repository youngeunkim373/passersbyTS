import prisma from "../../../lib/db/prisma";

export default async function getCommentPageCount(
  table: string,
  listId: string
) {
  try {
    const option = {
      where: {
        listId: listId,
      },
    };

    const result: number = await prisma?.[table].count(option);

    const getCommentPageCount =
      result % 10 === 0 ? Math.floor(result / 10) : Math.floor(result / 10) + 1;

    return getCommentPageCount;
  } catch (error) {
    return error;
  }
}
