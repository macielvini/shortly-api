import { connection } from "../database/server.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const encryptedPassword = bcrypt.hashSync(password, 10);

  try {
    await connection.query(
      `
      INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3);
    `,
      [name, email, encryptedPassword]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);

    if (error.detail) {
      return res.status(409).send({ message: error.detail });
    }

    res.sendStatus(500);
  }
};
