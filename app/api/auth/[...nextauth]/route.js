import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { signinSchema } from "@/utils/validation";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await connectDB();

        const { email, password } = credentials;
        console.log(email, password);

        try {
          await signinSchema.validateAsync(email, password);
        } catch (error) {
          console.log(error.details[0]);
          throw new Error(error.details[0].message);
        }

        const user = await User.findOne({ email });
        if (!user) throw new Error("User doesn't exist please register first");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Username or password is incorrect!");

        return { email };
      },
    }),
  ],
});
