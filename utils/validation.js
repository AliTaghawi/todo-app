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

export { signinSchema, registerSchema };
