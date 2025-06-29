import { NextResponse } from "next/server";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { registerSchema } from "@/utils/validation";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, confirmPassword } = await req.json();

    try {
      await registerSchema.validateAsync({ email, password, confirmPassword });
    } catch (error) {
      console.log(error.details[0]);
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 422 }
      );
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json(
        { error: "User already existed!" },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword });
    console.log(user)

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error!" },
      { status: 500 }
    );
  }
}
