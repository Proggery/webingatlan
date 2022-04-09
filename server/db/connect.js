const mysql = require("mysql2");
require("dotenv").config();

// const db = mysql.createConnection({
//   host: "eu-cdbr-west-02.cleardb.net",
//   user: "b1cb66ffd9368e",
//   password: "822dff14",
//   database: "heroku_462665c36d4d83f",
// });

const db = mysql.createConnection({
  host: process.env.DB_HT,
  port: process.env.DB_PT,
  user: process.env.DB_UR,
  password: process.env.DB_PW,
  database: process.env.DB_DB,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("sikeres csatlakozás az adatbázishoz");
});

module.exports = db;
