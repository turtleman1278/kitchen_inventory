const mysql = require("mysql2");

// Create MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zyxqir-Bytgud-2jybwe",
  database: "kitchen_cabinet",
});

// Connect to Database
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL:", connection.threadId);
});

// Execute SQL Queries
function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = { executeQuery };
