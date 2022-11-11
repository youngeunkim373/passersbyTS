import prisma from "../../../lib/db/prisma";

export default async function checkNickname(nickname: string) {
  try {
    const checkNickname = await prisma?.members.count({
      where: {
        nickname: String(nickname),
      },
    });

    return checkNickname;
  } catch (error) {
    return error;
  }
}
