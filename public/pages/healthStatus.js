
async function fetchNodeHealth() {
    try {
        const response = await fetch("http://localhost:3000/api/check-health");
        const data = await response.json();
        console.log(data);

        //const value = Object.values(data)[0] || "N/A";
        document.getElementById("nodeHealth").textContent = `${data.status} as of ${data.timestamp}`;

    } catch (error) {
        console.error("Error fetching Node ID:", error);
        document.getElementById("nodeHealth").textContent = "Error fetching Node ID";
    }
}

fetchNodeHealth();
