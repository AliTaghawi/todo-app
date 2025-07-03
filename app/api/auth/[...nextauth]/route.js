import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import TodoUser from "@/models/TodoUser";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { signinSchema } from "@/utils/validation";

export const authOption = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        
        try {
          await connectDB();
        } catch (error) {
          console.log("error in connecting DB:")
          console.log(error)
        }

        const { email, password } = credentials;

        try {
          await signinSchema.validateAsync({email, password});
        } catch (error) {
          console.log(error.details[0]);
          throw new Error(error.details[0].message);
        }

        const user = await TodoUser.findOne({ email });
        if (!user) throw new Error("User doesn't exist please register first");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Username or password is incorrect!");

        return { email };
      },
    }),
  ],
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
