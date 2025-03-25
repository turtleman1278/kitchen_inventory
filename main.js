const { app, BrowserWindow, Menu, ipcMain } = require("electron/main");
const path = require("node:path");

function createWindow() {

  const mainWindow = new BrowserWindow({
    title: "Kitchen Cabinet",
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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

ipcMain.handle("fetch-data", async () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM general_inventory", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
});
