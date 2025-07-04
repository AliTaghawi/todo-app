import { required } from "joi";
import { Schema, model, models } from "mongoose";

const todoUserSchema = new Schema(
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
          deadline: {
            type: Date,
            default: new Date(),
            required: true
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const TodoUser = models.TodoUser || model("TodoUser", todoUserSchema);

export default TodoUser;
