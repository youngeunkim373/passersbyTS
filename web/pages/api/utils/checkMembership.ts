import prisma from "../../../lib/db/prisma";

export default async function checkMembership(email: string) {
  try {
    const result: { [k: string]: string | number }[] = await prisma.$queryRaw`
            SELECT email     FROM members
             WHERE email = ${email}
          `;

    const checkMembership = result?.map(
      (check: { [k: string]: string | number }) => ({
        ...check,
      })
    );

    return checkMembership;
  } catch (error) {
    return error;
  }
}
