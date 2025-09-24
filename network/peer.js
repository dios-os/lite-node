const MESSAGE_TYPES = require('./message-types');


// Function to Initialize Web Socket Connections _______________________

function initConnection(ws, sockets) {
    sockets.push(ws);
    console.log('Peer connected');

    ws.on('message', (data) => {
        const message = JSON.parse(data);
        handleMessage(ws, message, sockets);
    });

    ws.on('close', () => {
        console.log('Peer disconnected');
        sockets.splice(sockets.indexOf(ws), 1);
    });

    // Send handshake
    ws.send(JSON.stringify({
        type: MESSAGE_TYPES.HANDSHAKE,
        data: sockets.map(sock => sock._socket.remoteAddress)
    }));
}


// Function to Handle Messages through Web Sockets ___________________________

function handleMessage(ws, message, sockets) {
    switch (message.type) {
        case MESSAGE_TYPES.HANDSHAKE:
            console.log('Received peer list:', message.data);
            break;
        default:
            console.log('Unknown message type', message.type);
    }
}

module.exports = { initConnection };
/*
Module exported to:
 - 
*/