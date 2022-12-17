import { signUpSchema } from "../models/auth.models.js";

export const validateSignUp = async (req, res, next) => {
  const { body } = req;

  const { error } = signUpSchema.validate(body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send({ message: errors });
  }

  try {
    next();
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
