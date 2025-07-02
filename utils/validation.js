import { isValidObjectId } from "mongoose";

const Joi = require("joi");

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const registerSchema = signinSchema.append({
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Password must match" }),
});

const todoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  status: Joi.string()
    .required()
    .regex(/todo|inprogress|done|review/)
    .message("Invalid status!"),
});

const todoEditSchema = todoSchema.append({
  _id: Joi.required().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.message("Invalid Id!");
    }
    return true;
  }),
});

export { signinSchema, registerSchema, todoSchema, todoEditSchema };
