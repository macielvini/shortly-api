import bcrypt from "bcrypt";

import { connection } from "../database/server.js";
import { signInSchema, signUpSchema } from "../models/auth.models.js";

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

export const validateSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = signInSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send({ message: errors });
  }

  try {
    const user = await connection.query(
      `
      SELECT *
      FROM users
      WHERE email=$1;
    `,
      [email]
    );

    if (!user.rowCount) return res.sendStatus(401);

    const confirmPassword = bcrypt.compareSync(password, user.rows[0].password);

    if (!confirmPassword) return res.sendStatus(401);

    delete user.rows[0].password;

    res.locals.user = user.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const foundToken = await connection.query(
      `SELECT * FROM sessions WHERE token=$1`,
      [token]
    );

    if (!foundToken.rowCount) return res.sendStatus(401);

    res.locals.session = foundToken.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
