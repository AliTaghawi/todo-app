import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import TodoUser from "@/models/TodoUser";
import connectDB from "@/utils/connectDB";

export async function GET(req, context) {
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

    const {todoId} = await context.params

    const todo = user.todos.find(todo => todo._id.equals(todoId))
    if (!todo) {
      return NextResponse.json({ error: `Can't find todo with Id:(${todoId}) in your todos` }, { status: 404 });
    }

    return NextResponse.json({todo}, {status: 200})

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error!" },
      { status: 500 }
    );
  }
}