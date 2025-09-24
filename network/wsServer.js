const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', (ws) => {
    console.log("WebSocket Connection Established");

    ws.on('message', (message) => {
        console.log('Received:', message);

        const data = JSON.parse(message);
        if (data.type === 'transaction'){
            console.log("processing transaction");
        }

        ws.send(JSON.stringify({ status: 'success', message: 'Transaction received'}));
    })

    setInterval(() => {
        ws.send(JSON.stringify ({ type: 'update', message: 'Blockchain updated'}))
    }, 5000)
});


console.log('WebSocket server running on ws://localhost:5000');



function gossipTxn(txn) {
    const txnId = txn.id || txn.hash;

    // Skip already gossiped txns
    if (gossipedTxns.has(txnId)) return;

    // Select ready peers
    const peers = Array.from(wss.clients || [])
        .filter(p => p.readyState === WebSocket.OPEN);

    if (peers.length === 0) return; // no peers to send to

    // Fanout: random subset
    const fanout = Math.ceil(Math.sqrt(peers.length));
    const selected = peers.sort(() => 0.5 - Math.random()).slice(0, fanout);

    // Send payload
    const payload = JSON.stringify(txn);
    let sent = false;
    selected.forEach(peer => {
        try {
        peer.send(payload);
        sent = true;
        } catch (err) {
        console.error('Failed to send to peer', err);
        }
    });

    // Mark as gossiped only if at least one peer got it
    if (sent) {
        gossipedTxns.add(txnId);
    }
}


// On new txn added locally
function onNewTxn(txn) {
    gossipTxn(txn);
}


// Anti-entropy sync: rebroadcast unconfirmed txns occasionally
setInterval(() => {
    newTransactionPool.getAllTransactions().forEach(txn => gossipTxn(txn));
},  10000);
