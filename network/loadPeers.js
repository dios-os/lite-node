const fs = require('fs');
const path = require('path');

const PEERS_FILE = path.join(__dirname, '..', 'peers.json');


// Load peers from file
function loadPeers() {
    try {
        const data = fs.readFileSync(PEERS_FILE, 'utf8');
        const peers = JSON.parse(data);
        //console.log('Test 1:', peers)

        if (!Array.isArray(peers) || peers.length === 0) {
            throw new Error('No peers found in peers.json');
        }
        return peers;
    } catch (err) {
        console.error('Error loading peers.json:', err.message);
        return [];
    }
}






module.exports = { loadPeers };
/*
Module exported to:
 - txnPool.js
 - verify.js
*/

