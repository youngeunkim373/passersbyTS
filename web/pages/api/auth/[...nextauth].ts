import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/utils/hashPassword";
import prisma from "../../../lib/db/prisma";
import { MembersProps } from "../../../types/globalTypes";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      authorize: async (credentials, _req) => {
        try {
          const result: MembersProps[] = await prisma.$queryRaw`
          SELECT email, password, nickname, userImage      FROM Members
           WHERE email = ${credentials?.email}
        `;

          const isValid = await verifyPassword(
            credentials!.password,
            result[0].password
          );

          if (!isValid) {
            throw new Error("Could not log in");
          }

          return {
            id: result[0].email,
            email: result[0].email,
            name: result[0].nickname,
            image: result[0].userImage,
          };
        } catch (e) {
          // const errorMessage = e.response.data.message;
          //throw new Error(errorMessage);
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
});
