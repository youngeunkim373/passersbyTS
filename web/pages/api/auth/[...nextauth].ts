import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import prisma from "../../../lib/db/prisma";
import { MembersKeys } from "../../../types/globalTypes";
import { verifyPassword } from "../../../lib/utils/hashPassword";

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
          const result: MembersKeys[] = await prisma.$queryRaw`
          SELECT email, password      FROM members
           WHERE email = ${credentials?.email}
          `;

          const isValid = await verifyPassword(
            credentials!.password,
            result[0].password!
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
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const result: MembersKeys[] = await prisma.$queryRaw`
      SELECT email, nickname as name, userImage as image, userRole as role, age, sex, region      FROM members
       WHERE email = ${session.user?.email}
      `;

      session.user = result[0];
      return session;
    },
  },
  secret: process.env.SECRET,
});
