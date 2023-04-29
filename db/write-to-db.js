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

// Example query to select all rows from a table named "users"
pool.query('SELECT * FROM players', (err, res) => {
    if (err) throw err;
  
    // Process the rows returned from the query
    for (let row of res.rows) {
      console.log(row);
    }
  
    // Close the pool (not required in most cases)
    pool.end();
  });