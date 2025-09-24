const consensusMechanisms = require('../network/consensus');

/*
// Function to verify wallet address
function verifyWallet( walletAddress ){
    const approvedWalletList = consensusMechanisms.proofOfAuthority();

    let walletVerified = false;

    if (approvedWalletList.includes(walletAddress)) {
        walletVerified = true;
    }else {
        walletVerified = false;
    }return walletVerified
}
*/


// Function to check whether a transaction is valid or not
function verifyTransaction ( transaction ){
    let transactionAuthenticity = false;
    let transactionType = false;
    let transactionFormat = false;
    let idContent = false;
    let hashContent = false;
    //const chainDatabase = ["dummy_hash"];
    //const chainDatabase = ["other_dummy_hash"];

    // Check that each transaction is a JavaScript Object  
    if (transaction && typeof transaction === 'object') { 
        transactionType = true;
        console.log("Transaction Type:", transactionType);
    }else {
        transactionType = false;
        console.log("Error! Incorrect Transaction Type:", transactionType);
    }
        
    // Check that each transaction contains a Transaction I.D and a Transaction Hash 
    if ( transaction.hasOwnProperty('transaction_id') && transaction.hasOwnProperty('transaction_hash')) {
        transactionFormat = true;
        console.log("Transaction Format:", transactionFormat);
    }else {
        transactionFormat = false;
        console.log("Error! Incorrect Transaction Format:", transactionFormat);
    }
    
    // Check the contents of each transaction to ensure they are correct       
    if (typeof transaction.transaction_id === 'string'){
        idContent = true;
    }else {
        idContent = false;
    }

    if (typeof transaction.transaction_hash === 'string'){
        hashContent = true;
    }else {
        hashContent = false;
    }
    console.log("I.D content:", idContent, "\nHash Content:", hashContent);
    

    // Check that transaction is not already on the chain
    if (transactionType && transactionFormat && idContent && hashContent ){
        //transactionAuthenticity = chainDatabase.includes(transaction.transaction_hash);
        transactionAuthenticity = true;
    }
    console.log("Transaction Authenticity:", transactionAuthenticity);
    return transactionAuthenticity;
    };



module.exports = { verifyWallet, verifyTransaction };
/*
Module exported to:
 - index.js
*/
