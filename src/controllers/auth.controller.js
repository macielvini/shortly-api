import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { connection } from "../database/server.js";

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

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const { user } = res.locals;
  try {
    const sessions = await connection.query(
      `
      SELECT *
      FROM sessions
      WHERE user_id = $1;
    `,
      [user.id]
    );

    const userSession = sessions.rows[0];

    if (!userSession) {
      const newToken = uuid();

      await connection.query(
        `
      INSERT INTO sessions
      (token, user_id, expiry_timestamp)
      VALUES ($1, $2, now() + INTERVAL '90 days');
      `,
        [newToken, user.id]
      );

      return res.status(200).send({ ...user, token: newToken });
    }

    const tokenExpired = Date.parse(userSession.expiry_timestamp) < Date.now();

    if (tokenExpired) {
      await connection.query(`
        DELETE FROM sessions WHERE expiry_timestamp < now();
      `);

      const newToken = uuid();

      await connection.query(
        `
      INSERT INTO sessions
      (token, user_id, expiry_timestamp)
      VALUES ($1, $2, now() + INTERVAL '90 days');
      `,
        [newToken, user.id]
      );

      return res.status(200).send({ ...user, token: newToken });
    }

    res.status(200).send({ ...user, token: userSession.token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
