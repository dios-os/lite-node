//const handleData = require('./dataEntry');
const cryptoHash = require('../utils/crypto-hash');
//const consensus = require('../network/consensus');
const config = require('../config/config');



// Class to create the transaction pool
class TransactionPool {

    // Constructor for the transaction pool as a hashmap of transactions
    constructor() {
        this.transactionInPool = {}; // keyed by transaction_hash
    }

    // Function to check for duplicate transactions
    hasTransaction(hash) {
        return !!this.transactionInPool[hash];
    }

    // Function to check whether a transaction is valid or not
    verifyTransaction(sentFromAddress, transactionHash, transactionID, signedBy) {
        if (!sentFromAddress || !transactionHash || !transactionID || !signedBy) return false;

        if (typeof sentFromAddress !== 'string') return false;
        if (typeof transactionID !== 'string') return false;
        if (typeof transactionHash !== 'string') return false;
        if (typeof signedBy !== 'string') return false;

        if (this.hasTransaction(transactionHash)) return false;

        return true;
    }

    // Function to handle data uploads from users
    handleData(sentFromAddress, transactionHash, transactionID, signedBy) {
        const timestamp = config.getCurrentTimeWithMilliseconds();

        return {
            senders_address: sentFromAddress,
            transaction_ID: transactionID,
            transaction_hash: transactionHash,
            senders_signature: signedBy,
            timestamp: timestamp
        };
    }

    // Function to add transactions to the transaction pool
    addTransaction(transaction) {
        this.transactionInPool[transaction.transaction_hash] = transaction;
        return this.transactionInPool;
    }

    // Function to get all transactions in the transaction pool as an array
    getAllTransactions() {
        return Object.values(this.transactionInPool);
    }

    // Function to check the size of the transaction pool
    checkPoolSize() {
        return Object.keys(this.transactionInPool).length;
    }

    // Function to remove processed transactions
    filterPool(txns) {
        for (const tx of txns) {
            delete this.transactionInPool[tx.transaction_hash];
        }
        return this.transactionInPool;
    }

    // Override JSON serialization to output only the pool contents
    toJSON() {
        return this.transactionInPool;
    }
}


module.exports = TransactionPool;

