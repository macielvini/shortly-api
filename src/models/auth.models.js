import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().max(50).required(),
  email: joi.string().email().max(30).required(),
  password: joi.string().required(),
  confirmPassword: joi
    .any()
    .equal(joi.ref("password"))
    .required()
    .label("password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});
