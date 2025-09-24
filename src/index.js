// API Endpoints for the Ahtiso DIOS Testnet ________________________________________

// Required modules ___________________________________
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const open = require('open');

const blockchain = require('../services/blockchainInstance');
const txnPoolInstance = require('../services/txnPoolInstance');
const PubSub = require('../network/pubsub');
const Peer = require('../network/peer');
const { loadPeers } = require('../network/peerManager');

// ######################################################################


// Initialize App _________________________________
const app = express();
//startConsensusLoop()
// ######################################################################


// Calling key classes_____________________
const pubsub = new PubSub({ blockchain });
const KNOWN_PEERS = loadPeers();
// ######################################################################


// Setting the default port for cloud and local operations _______________
const DEFAULT_PORT = 1000;  
const ROOT_NODE_ADDRESS = process.env.ROOT_NODE_ADDRESS || `http://localhost:${DEFAULT_PORT}`;
// ######################################################################


// Middleware _____________________________________________
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); 

// CORS configuration to handle traffic from front-end
app.use(cors());
// ######################################################################


// Function to handle rate limiting ____________________________________
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requests per IP
}));
// ######################################################################





// Node generation and connection (websockets)___________________________________________________
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on('connection', (ws) => {
    Peer.initConnection(ws, sockets);
    console.log(`Total peers: ${sockets.length}`);
});

function connectToPeers(peers) {
    peers.forEach((peerUrl) => {
        const ws = new WebSocket(peerUrl);
        ws.on('open', () => {
            Peer.initConnection(ws, sockets);
            console.log(`Connected peers: ${sockets.length}`);
        });
        
       ws.on('error', () => {
        console.log(`Connection failed to ${peerUrl}`)
        });
    });
}
// ######################################################################




// TEST NETWORK ________________________________________________________
//blockchainInstance.isTestNetwork = true;
blockchain.isTestNetwork = true;
// ######################################################################



// GET Requests ________________________________________________________

// GET request for node homepage
app.get('/node-home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/index.html'));
});

// GET request to see the status of the blockchain 
app.get('/api/get-blocks', (req, res) => {
    res.json( blockchain.chain );
    //res.json(blockchainInstance);
});

// GET request to see the transaction pool
app.get('/api/get-transactions', (req, res) => {
    //res.json(newTransactionPool);
    const newTxnPool = txnPoolInstance.toJSON()
    res.json(newTxnPool);
});


// GET request to check App health
app.get('/api/check-health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// ######################################################################


// POST Requests _____________________________________________________________
// ###############
  

// Local Testing and Peer Generation ________________________________________________________________
let PEER_PORT;              // Define variable for additional local ports for when the default port is taken

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT; // Use the element on the other side if one side is taken

// Reset blockchain after a certain number of blocks
const MAX_TEST_BLOCKS = 100;
if (blockchain.length >= MAX_TEST_BLOCKS) {
    blockchain.chain = [blockchain.chain[0]]; // Reset to genesis block
}

// ######################################################################




// Listening on the right port and automatically opens homepage for each node
server.listen(PORT, () => {
    console.log(`DIOS Node Activated and Listening on Localhost: ${PORT}.`);
    console.log('Loading Dashboard...');
    
    open(`http://localhost:${PORT}/node-home`);

    if (PORT !== DEFAULT_PORT){
    connectToPeers(KNOWN_PEERS);
    }
});
// ######################################################################



//module.exports = upload;

