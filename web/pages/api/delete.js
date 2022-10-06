import prisma from "../../lib/prisma";

export default async function HandleDelete(req, res) {
  const checkedData = req.body;
  let result;

  for (var checked of checkedData) {
    // prisma
    // result = await prisma.members.delete({
    //   where: {
    //     user_email: checked,
    //   },
    // });

    // raw SQL
    result = await prisma.$queryRaw`
         DELETE FROM Members
          WHERE user_email = ${checked}
       `;
  }

  res.json(result);
}
