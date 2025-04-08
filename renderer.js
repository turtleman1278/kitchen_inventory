async function loadTable(tableName) {
  try {
    const inventory = await window.electronAPI.fetchData(tableName);
    const title = tableName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    document.getElementById("table-title").innerText = title;

    const tableBody = document.getElementById("inventory-table-body");
    const tableHeaders = document.getElementById("table-headers");
    tableBody.innerHTML = "";
    tableHeaders.innerHTML = "";

    if (inventory.length > 0) {
      const headerRow = document.createElement("tr");
      Object.keys(inventory[0]).forEach((key) => {
        const th = document.createElement("th");
        th.innerText = key;
        headerRow.appendChild(th);
      });
      tableHeaders.appendChild(headerRow);

      inventory.forEach((item) => {
        const row = tableBody.insertRow();
        Object.values(item).forEach((value) => {
          row.insertCell().innerText = value;
        });
      });
    } else {
      const row = tableBody.insertRow();
      row.insertCell().innerText = "No data found.";
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
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
document
  .getElementById("category-btn")
  .addEventListener("click", () => loadTable("category"));
document
  .getElementById("drinks-btn")
  .addEventListener("click", () => loadTable("drinks"));
document
  .getElementById("appliance-btn")
  .addEventListener("click", () => loadTable("kitchen_appliance"));
document
  .getElementById("nonperishable-btn")
  .addEventListener("click", () => loadTable("non_perishable"));
document
  .getElementById("perishables-btn")
  .addEventListener("click", () => loadTable("perishables"));
