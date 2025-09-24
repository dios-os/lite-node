const fs = require('fs');
//const { startBlockchainSync, loadBlockchainFromFile} = require('./synchFile');
//const Blockchain = require('../models/blockchain');
const blockchain = require('../services/blockchainInstance');
const txnPoolInstance = require('../services/txnPoolInstance');
const { nodeId } = require('../config/nodeConfig');

//const filePath = '../blockchain.json';


function addLatestBlock( block ) {
    
    try {               
        blockchain.addBlockToChain(block);

        console.log(`[SYSTEM UPDATE] ${nodeId} Blockchain Ledger updated as of ${new Date().toLocaleString()}:`, blockchain.chain);
        
        // Filter out transactions that have already been included in the block
        txnPoolInstance.filterPool(block.data);

        console.log('[SYSTEM UPDATE] Transaction Pool Updated', txnPoolInstance.transactionInPool)

        return {
            blockchain: blockchain.chain,
            txnPool: updatedPool
        };
    } catch (err) {
        return {error: err.message};
    }

}

module.exports = { addLatestBlock };


