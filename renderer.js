async function loadTable(tableName) {
  try {
    const inventory = await window.electronAPI.fetchData(tableName);
    console.log(`Loaded ${tableName}:`, inventory);

    // Format and set title
    document.getElementById("table-title").innerText = tableName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const tableBody = document.getElementById("inventory-table-body");
    tableBody.innerHTML = "";

    inventory.forEach((item) => {
      const row = tableBody.insertRow();
      Object.values(item).forEach((val) => {
        row.insertCell().innerText = val;
      });
    });
  } catch (error) {
    console.error("Error loading table:", error);
  }
}

document
  .getElementById("general-btn")
  .addEventListener("click", () => loadTable("general_inventory"));
document
  .getElementById("pantry-btn")
  .addEventListener("click", () => loadTable("pantry_inventory"));
document
  .getElementById("shopping-btn")
  .addEventListener("click", () => loadTable("shopping_list"));

document.addEventListener("DOMContentLoaded", () =>
  loadTable("general_inventory")
);
