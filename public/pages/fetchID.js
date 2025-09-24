
const API_URL = "http://localhost:3000/api/get-node-id";

async function fetchNodeId() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        //console.log(data);

        //const value = Object.values(data)[0] || "N/A";
        document.getElementById("nodeId").textContent = data;

    } catch (error) {
        console.error("Error fetching Node ID:", error);
        document.getElementById("nodeId").textContent = "Error fetching Node ID";
    }
}

fetchNodeId();
