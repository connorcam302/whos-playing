const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.options.max = 1;

export default function handler({ query: { id } }, res) {
  let time = new Date();
  console.log(`\x1b[34m   time - \x1b[0m ${time.toLocaleString()}`);
  console.log(`\x1b[32m   endpoint - \x1b[0m /api/player/${id}`);

  pool.query("SELECT * FROM players WHERE id=$1", [id], (err, result) => {
    if (err) {
      console.log("\x1b[31m   status - \x1b[0m 404");
      res.status(404).send({ message: `Player with id ${id} not found.`, status: 404 });
    }

    if (result.rows[0] != null) {
      console.log("\x1b[31m   status - \x1b[0m 200");
      res.status(200).send(result.rows)
    }
  });
}
