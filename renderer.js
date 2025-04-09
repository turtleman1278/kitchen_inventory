async function loadTable(tableName) {
  try {
    // Fetch data from Electron's main process
    const inventory = await window.electronAPI.fetchData(tableName);
    console.log("Inventory data:", inventory); // Log the fetched data

    // Set title based on table name
    const title = tableName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    document.getElementById("table-title").innerText = title;

    // Get the table body and headers elements
    const tableBody = document.getElementById("inventory-table-body");
    const tableHeaders = document.getElementById("table-headers");

    // Clear previous content
    tableBody.innerHTML = "";
    tableHeaders.innerHTML = "";

    // Check if data is available
    if (inventory.length > 0) {
      // Create headers dynamically based on the first object in the data
      const headerRow = document.createElement("tr");
      Object.keys(inventory[0]).forEach((key) => {
        const th = document.createElement("th");
        th.innerText = key;
        headerRow.appendChild(th);
      });
      tableHeaders.appendChild(headerRow);

      // Populate table rows with data
      inventory.forEach((item) => {
        const row = tableBody.insertRow();
        Object.values(item).forEach((value) => {
          const cell = row.insertCell();
          cell.innerText = value;
        });
      });
    } else {
      // If no data, display a message
      const row = tableBody.insertRow();
      row.insertCell().innerText = "No data found.";
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
}

// Get the table name from the URL and call loadTable to populate it
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tableName = urlParams.get("table") || "general_inventory"; // Default to general_inventory if no table is specified
  console.log("Loading table:", tableName); // Log the table name
  loadTable(tableName);
});
