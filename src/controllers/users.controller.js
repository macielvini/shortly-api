import { connection } from "../database/server.js";

export const find = async (req, res) => {
  const { session } = res.locals;

  try {
    const user = await connection.query(
      `
      SELECT users.id, users.name, SUM(urls.visitors) AS "visitCount",
        json_agg(
          json_build_object('id', urls.id,
            'shortUrl', urls.shortened_url,
            'url', urls.original_url,
            'visitCount', urls.visitors)
        ) AS "shortenedUrls"
      FROM users JOIN urls ON users.id = urls.owner_id
      WHERE users.id = $1
      GROUP BY users.id;
      `,
      [session.user_id]
    );

    res.send(user.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
