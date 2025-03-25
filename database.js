const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost", // Change to your database host
  user: "root", // Your MySQL username
  password: "zyxqir-Bytgud-2jybwe", // Your MySQL password
  database: "kitchen_cabinet", // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + connection.threadId);
});

module.exports = connection;
