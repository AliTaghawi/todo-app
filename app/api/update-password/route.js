import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import TodoUser from "@/models/TodoUser";
import connectDB from "@/utils/connectDB";
import { hashPassword, verifyPassword } from "@/utils/auth";
import { changePasswordSchema } from "@/utils/validation";

export async function PATCH(req) {
  try {
    await connectDB();

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "You are unauthorized!" },
        { status: 403 }
      );
    }

    const user = await TodoUser.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "Can't find user!" }, { status: 404 });
    }

    const { password, newPassword, repeatPassword } = await req.json();

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Password is not correct!" },
        { status: 422 }
      );
    }

    try {
      await changePasswordSchema.validateAsync({ newPassword, repeatPassword });
    } catch (error) {
      console.log(error.details[0]);
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.save();

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error!" },
      { status: 500 }
    );
  }
}
