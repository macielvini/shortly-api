import { connection } from "../database/server.js";

export const find = async (req, res, next) => {
  try {
    const rank = await connection.query(
      `
        SELECT users.id, users.name, COUNT(urls.owner_id) AS "linkCount", SUM(urls.visitors) AS "visitCount"
        FROM users
        JOIN urls ON users.id = urls.owner_id
        GROUP BY users.id
        ORDER BY "visitCount" DESC LIMIT 10
        ;
        `
    );

    res.send(rank.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
