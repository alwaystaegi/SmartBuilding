export {};
const mysql = require("mysql2");
require("dotenv").config();
let db;

try {
  db = mysql.createConnection({
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    port: process.env.NEXT_PUBLIC_DB_PORT,
    database: process.env.NEXT_PUBLIC_DB,
  });
} catch (err) {
  console.error(err);
}

module.exports = db;
