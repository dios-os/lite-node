const fs = require('fs');
const path = require('path');

const PEERS_FILE = path.join(__dirname, '..', 'peers.json');

// Load peers from file
function loadPeers() {
    try {
        const data = fs.readFileSync(PEERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error loading peers.json:', err.message);
        return [];
    }
}

// Save peers to file
function savePeers(peers) {
    try {
        fs.writeFileSync(PEERS_FILE, JSON.stringify(peers, null, 2));
    } catch (err) {
        console.error('Error saving peers.json:', err.message);
    }
}

// Add new peer if not already present
function addPeer(peerUrl) {
    const peers = loadPeers();
    if (!peers.includes(peerUrl)) {
        peers.push(peerUrl);
        savePeers(peers);
    }
}

// Remove a peer
function removePeer(peerUrl) {
    let peers = loadPeers();
    peers = peers.filter(p => p !== peerUrl);
    savePeers(peers);
}



module.exports = { loadPeers, savePeers, addPeer, removePeer };
