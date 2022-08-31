require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USUARIO,
  password: process.env.SENHA,
  database: process.env.BANCO
});

module.exports = {
    connection
}