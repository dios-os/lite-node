
async function fetchBlocks() {
    try {
        const response = await fetch("http://localhost:3000/api/get-blocks");
        const blocks = await response.json();
        const tbody = document.getElementById("blockchain-table-body");
        tbody.innerHTML = ""; // Clear previous rows

        if (!blocks || blocks.length === 0) {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="3" style="text-align:center; color:gray;">Blockchain not updated</td>`;
            tbody.appendChild(row);
            return;
        }

        blocks.forEach(block => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${block.blockIndex || "N/A"}</td>
                <td>${block.previousHash || "N/A"}</td>
                <td>${block.hash || "N/A"}</td>
                <td>${block.timeStamp || "N/A"}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching blocks:", error);
        const tbody = document.getElementById("blockchain-table-body");
        tbody.innerHTML = `<tr><td colspan="3" style="color:red;">Error fetching Blockchain</td></tr>`;
    }
}



// Run once on page load
fetchBlocks();

//setInterval(() => fetchBlocks(), 5000);