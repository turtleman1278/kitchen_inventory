const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { executeQuery } = require("./database"); // Import DB functions

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "Kitchen Cabinet",
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Preload script
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

// IPC Handler for Fetching Data
ipcMain.handle("fetch-data", async () => {
  try {
    const results = await executeQuery("SELECT * FROM general_inventory");
    return results;
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Database query failed" };
  }
});
