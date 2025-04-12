const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  fetchData: async (tableName) => {
    console.log("Fetching data for table:", tableName); // Add this log for debugging
    try {
      const response = await ipcRenderer.invoke("fetch-data", tableName);
      console.log("Fetched data:", response); // Check the response from IPC
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
});
