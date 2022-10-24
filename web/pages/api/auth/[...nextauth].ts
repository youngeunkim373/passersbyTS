import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/utils/hashPassword";
import prisma from "../../../lib/db/prisma";

interface signInProps {
  email: string;
  password: string;
}

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
          const result: signInProps[] = await prisma.$queryRaw`
          SELECT email, password     FROM Members
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
