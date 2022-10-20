import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/hasePassword";
import prisma from "../../../lib/prisma";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials, _req) => {
        try {
          const result = await prisma.$queryRaw`
          SELECT email, password     FROM Members
           WHERE email = ${credentials.email}
        `;

          const isValid = await verifyPassword(
            credentials.password,
            result[0].password
          );

          if (!isValid) {
            throw new Error("Could not log in");
          }

          return { email: result[0].email };
        } catch (e) {
          const errorMessage = e.response.data.message;
          throw new Error(errorMessage);
          return null;
        }
      },
    }),
  ],
});
