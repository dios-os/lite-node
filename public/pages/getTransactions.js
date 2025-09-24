async function fetchTransactions() {
  try {
    const response = await fetch("http://localhost:3000/api/get-transactions");
    const data = await response.json();
    console.log("Transaction pool:", data);

    const tbody = document.getElementById("pending-users-body");
    tbody.innerHTML = ""; // Clear any previous rows

    // Convert object -> array of values
    const transactions = Object.values(data);

    if (transactions.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="4" style="text-align:center; color:gray;">No pending transactions</td>`;
      tbody.appendChild(row);
      return;
    }

    transactions.forEach(tx => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${tx.senders_address || "N/A"}</td>
        <td>${tx.transaction_hash || "N/A"}</td>
        <td>${tx.transaction_ID || "N/A"}</td>
        <td>${tx.timestamp || "N/A"}</td>
      `;

      tbody.appendChild(row);
    });

  } catch (error) {
    console.error("Error fetching transactions:", error);
    const tbody = document.getElementById("pending-users-body");
    tbody.innerHTML = `<tr><td colspan="4" style="color:red;">Error fetching transactions</td></tr>`;
  }
}


// Run once on page load
fetchTransactions();

//setInterval(() => fetchTransactions(), 5000);