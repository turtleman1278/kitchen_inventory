import { ipcRenderer } from "electron";

async function loadInventory() {
  try {
    const inventory = await ipcRenderer.invoke("fetch-inventory");
    console.log("Inventory:", inventory);

    let tableBody = document.getElementById("inventory-table-body");
    tableBody.innerHTML = ""; // Clear previous data

    inventory.forEach((item) => {
      let row = tableBody.insertRow();
      row.insertCell(0).innerText = item.item_id;
      row.insertCell(1).innerText = item.item_name;
      row.insertCell(2).innerText = item.item_quantity;
      row.insertCell(3).innerText = item.item_location;
      row.insertCell(4).innerText = item.category_id;
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadInventory);
