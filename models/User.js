import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    lastName: String,
    todos: {
      type: [
        {
          title: String,
          description: String,
          status: {
            type: String,
            enum: ["inprogress", "done", "review", "todo"],
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
