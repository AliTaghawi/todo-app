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
  deadline: Joi.date().greater("now").required(),
});

const todoEditSchema = todoSchema.append({
  _id: Joi.required().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.message("Invalid Id!");
    }
    return true;
  }),
});

const changePasswordSchema = Joi.object({
  newPassword: Joi.string().min(8).required(),
  repeatPassword: Joi.any()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({ "any.only": "Password repeat must match" }),
});

export {
  signinSchema,
  registerSchema,
  todoSchema,
  todoEditSchema,
  changePasswordSchema,
};
