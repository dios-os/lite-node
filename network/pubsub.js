const PubNub = require ('pubnub');
delete require.cache[require.resolve('../models/block')];
require('dotenv').config();
const { nodeId } = require('../config/nodeConfig');

const {addLatestBlock} = require('../services/addBlockService');
const {processNewTransaction} = require('../services/transactionService');

const credentials = {
    subscribeKey: process.env.SUBSCRIBE_KEY,
    userId: nodeId 
};

if (!credentials.subscribeKey) {
    throw new Error('Missing required environment variables. Check your .env file or Heroku config.');
}

// Set the channels for the blockchain to listen on
const CHANNELS = {
    BLOCKCHAIN: 'BLOCKCHAIN',
    NEW_TRANSACTION: 'NEW_TRANSACTION',    
}

// PubSub class that contains the logic of how messages are sent and received on the blockchainb
class PubSub {
    constructor({ blockchain }) {
        this.blockchain = blockchain;
        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
        this.listener();
    }

    /*
    listener() {
        this.pubnub.addListener({
            message: (messageObject) => {
                const { channel, message } = messageObject;
                let parsed;

                
                try {
                    parsed = JSON.parse(message);
                } catch {
                    console.log(`[PubSub] Invalid message on ${channel}:`, message);
                    return;
                }
                    

                //const { origin, payload } = parsed;

                if (origin === nodeId) return;

                if ( channel === CHANNELS.NEW_TRANSACTION ) {
                    const newTransaction = JSON.parse(payload);
                    processNewTransaction( newTransaction );
                }


                // Logic if message recevied on the UPDATES channel
                if (channel === CHANNELS.UPDATES) {
                    console.dir(payload, { depth: null });
                    }

                    
                if (channel === CHANNELS.BLOCKCHAIN) {
                    //const newestBlock = JSON.parse(payload);
                    const newestBlock = parsed.blockData;
                    addLatestBlock( newestBlock )
                    }
            }
                
        });
        
    }*/

    listener() { 
        this.pubnub.addListener({ 
            message: (messageObject) => { 
                const { channel, message } = messageObject; 
                
                let parsed; 
                
                try { 
                    parsed = JSON.parse(message); 
                } catch { 
                    console.log("[PubSub] Invalid message on ${channel}:", message); 
                    return; 
                } 
                    
                const { origin, payload } = parsed; 
                
                if (origin === nodeId) return; 
                
                switch(channel) { 
                    case CHANNELS.NEW_TRANSACTION: 
                    processNewTransaction(JSON.parse(payload)); 
                        break; 


                    case CHANNELS.BLOCKCHAIN: 
                    //console.log('[BLCHN LISTENER TEST]', JSON.parse(payload));
                    const latestBlock = JSON.parse(payload);
                    
                    addLatestBlock(latestBlock); 
                        break; 
                } 
            } 
        }); 
    } 
   

   
}


module.exports = PubSub;
/*
Module exported to:
 - index.js
*/