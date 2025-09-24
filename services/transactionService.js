//const TransactionPool = require('../models/txnPool');

//const newTxnPool = new TransactionPool();
const txnPoolInstance = require('./txnPoolInstance');


function processNewTransaction( transaction ) {
    try{
        const verifyTransaction = txnPoolInstance.verifyTransaction(
            transaction.senders_address, 
            transaction.transaction_ID,
            transaction.transaction_hash,
            transaction.senders_signature
        )

        if (!verifyTransaction){
            return {error: "Invalid transaction signature"};
        }

        if (txnPoolInstance.hasTransaction(transaction.transaction_hash)){
            return {error: "Duplicate transaction"};
        }
            
        txnPoolInstance.addTransaction(transaction);
        console.log("Updated Transaction Pool", txnPoolInstance.toJSON() );
        //JSON.stringify(txnPoolInstance)
        return { message: "Transaction added to pool", transactionPool: txnPoolInstance.toJSON() };
        //return { newTxnPool };
    } catch (err) {
        return {error: err.message};
    }   
};


module.exports = { processNewTransaction };
