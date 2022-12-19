import { nanoid } from "nanoid";
import { connection } from "../database/server.js";

export const create = async (req, res, next) => {
  const newUrl = nanoid(9);
  const { session } = res.locals;
  try {
    await connection.query(
      `
      INSERT INTO links 
      (owner_id, shortened_link, original_link)
      VALUES ($1, $2, $3);
    `,
      [session.user_id, newUrl, req.body.url]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
