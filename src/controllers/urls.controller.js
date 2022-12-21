import { nanoid } from "nanoid";
import { connection } from "../database/server.js";

export const create = async (req, res, next) => {
  const newUrl = nanoid(9);
  const { session } = res.locals;
  try {
    await connection.query(
      `
      INSERT INTO urls 
      (owner_id, shortened_url, original_url)
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

export const find = async (req, res) => {
  const { url } = res.locals;

  try {
    res.send({
      id: url.id,
      shortUrl: url.shortened_url,
      url: url.original_url,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const redirect = async (req, res) => {
  const { url } = res.locals;

  try {
    await connection.query(
      `
    UPDATE urls SET visitors = visitors + 1 WHERE id=$1
    `,
      [url.id]
    );

    res.redirect(url.original_url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
