// Required Modules_________________________
const cryptoHash = require('../utils/crypto-hash');


// Creating the block class with the components of each block
class Block {

    // Constructor for the Block class
    constructor(blockIndex, previousHash, timeStamp, data, hash) {
        this.blockIndex = blockIndex;
        this.previousHash = previousHash;
        this.timeStamp = timeStamp;
        this.data = data;
        this.hash = hash;
    }


    // Data for the genesis block
    static GENESIS_DATA = {
        blockIndex: "0000000",
        timeStamp: "11:07pm",
        previousHash: 'Test Previous Hash',
        hash: 'Test Hash',
        data: "Ahtiso DIOS Test Network",
        validator: "Ahtiso"
    };
    

    // Function to define data for each block
    defineBlockData(  ){
        const data = [];
        return data;
    };


    // Function to add transactions to blocks
    addTransactionToBlock ( transaction ) {
        const data = [];
        data.push(transaction)
        return data;
    };


    // Creating a new block instance
    //static createNewBlock( previousHash, data ) {
    createNewBlock( previousHash, data ) {
        let blockIndex, timeStamp, hash ;
        
        blockIndex = String(Date.now()).padStart(7, '0');
        timeStamp = new Date().toISOString() + " Ahtiso DIOS Test Network";
        hash = cryptoHash(blockIndex, previousHash, Date.now(), data);
        
        const block = new Block(blockIndex, previousHash, timeStamp, data, hash);
        return block;
    }

    toJSON() {
        return {
            blockIndex: this.blockIndex,
            previousHash: this.previousHash,
            timeStamp: this.timeStamp,
            data: this.data,
            hash: this.hash
        };
    }



}


module.exports = Block;
/*
Module exported to:
 - index.js
*/