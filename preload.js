const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // Fetch table data
  fetchData: async (tableName) => {
    console.log("Fetching data for table:", tableName);
    try {
      const response = await ipcRenderer.invoke("fetch-data", tableName);
      console.log("Fetched data:", response);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  // Add a new item to general_inventory
  addItem: async (item) => {
    try {
      const result = await ipcRenderer.invoke("add-item", item);
      console.log("Add item result:", result);
      return result;
    } catch (error) {
      console.error("Error adding item:", error);
      return false;
    }
  },

  // Remove an item from general_inventory
  removeItem: async (id) => {
    try {
      const result = await ipcRenderer.invoke("remove-item", id);
      console.log("Remove item result:", result);
      return result;
    } catch (error) {
      console.error("Error removing item:", error);
      return false;
    }
  },

  // Placeholder for update functionality in the future
  // updateItem: async (item) => {
  //   return await ipcRenderer.invoke("update-item", item);
  // }
});
