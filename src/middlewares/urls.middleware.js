import { connection } from "../database/server.js";
import { shortenSchema } from "../models/urls.models.js";

export const validateSchema = async (req, res, next) => {
  const { error } = shortenSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send({ message: errors });
  }

  next();
};

export const validateUrlId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const url = await connection.query(
      `
        SELECT * FROM urls WHERE id=$1
      `,
      [id]
    );

    if (!url.rowCount) return res.sendStatus(404);

    res.locals.url = url.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const validateShortUrl = async (req, res, next) => {
  const { shortUrl } = req.params;

  try {
    const url = await connection.query(
      `SELECT * FROM urls WHERE shortened_url=$1`,
      [shortUrl]
    );

    if (!url.rowCount) return res.sendStatus(404);

    res.locals.url = url.rows[0];
    next();
  } catch (error) {
    console.log(error);
  }
};

export const validateUrlOwner = async (req, res, next) => {
  const { url, session } = res.locals;

  if (url.owner_id !== session.user_id) return res.sendStatus(401);
  next();
};
