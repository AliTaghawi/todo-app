import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { todoEditSchema, todoSchema } from "@/utils/validation";
import { sortTodos } from "@/utils/helperFuncs";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "You are unauthorized!" },
        { status: 403 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "Can't find user!" }, { status: 404 });
    }

    const { title, description, status } = await req.json();

    //validation
    try {
      await todoSchema.validateAsync({ title, description, status });
    } catch (error) {
      console.log(error.details[0]);
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 422 }
      );
    }

    user.todos.push({ title, description, status });
    user.save();
    return NextResponse.json(
      { message: "Todo created successfully" },
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

export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession(req);
    console.log(session)
    if (!session) {
      return NextResponse.json(
        { error: "You are unauthorized!" },
        { status: 403 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "Can't find user!" }, { status: 404 });
    }

    const todos = sortTodos(user.todos);

    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error!" },
      { status: 500 }
    );
  }
}

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

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "Can't find user!" }, { status: 404 });
    }

    const { _id, title, description, status } = await req.json();

    try {
      await todoEditSchema.validateAsync({ _id, title, description, status });
    } catch (error) {
      console.log(error.details[0]);
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 422 }
      );
    }

    const result = await User.updateOne(
      { "todos._id": _id },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.description": description,
          "todos.$.status": status,
        },
      }
    );
    console.log(result);

    return NextResponse.json(
      { message: "Todo successfully updated" },
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
