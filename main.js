const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zyxqir-Bytgud-2jybwe", // Make sure to use the correct password
  database: "kitchen_cabinet",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL:", connection.threadId);
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "Kitchen Cabinet",
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Fetch data from the database when requested from the renderer process
ipcMain.handle("fetch-data", async (event, tableName) => {
  try {
    const query = `SELECT * FROM ${tableName}`;
    console.log("Executing query:", query); // Log the query for debugging
    const [rows] = await connection.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Database query failed" }; // Return an error message if something goes wrong
  }
});

ipcMain.handle("add-item", async (event, item) => {
  try {
    const query = `INSERT INTO general_inventory (item_name, item_quantity, category_id) VALUES (?, ?, ?)`;
    await connection
      .promise()
      .query(query, [item.name, item.quantity, item.categoryId]);
    return true;
  } catch (error) {
    console.error("Add item error:", error);
    return false;
  }
});

ipcMain.handle("remove-item", async (event, id) => {
  try {
    const query = `DELETE FROM general_inventory WHERE item_id = ?`;
    await connection.promise().query(query, [id]);
    return true;
  } catch (error) {
    console.error("Remove item error:", error);
    return false;
  }
});


