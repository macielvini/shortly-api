import { shortenSchema } from "../models/urls.models.js";

export const validateSchema = async (req, res, next) => {
  const { error } = shortenSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send({ message: errors });
  }

  next();
};
