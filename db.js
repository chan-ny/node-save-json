//mysql connection setup
const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "vrms_dev",
  multipleStatements: true,
});

module.exports = connection;
