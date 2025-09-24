// Required Modules_________________________
const Block = require('../models/block');
//const TransactionPool = require('../models/txnPool');
const cryptoHash = require('../utils/crypto-hash');


// Blockchain Class 
class Blockchain {

  // Constructor for the blockchain that includes the genesis block
  constructor() {
    this.chain = [Blockchain.GENESIS_DATA]; 
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


  //Get last block
  getLastBlock() { 
    const lastBlock = this.chain[this.chain.length - 1]; 
    return lastBlock;
  };


  // Get the hash of the last block in the chain
  getLastBlockHash() { 
    const lastBlock = this.chain[this.chain.length - 1]; 
    return lastBlock.hash;
  };
  

  // Getting transactions from the transaction pool before adding them to a block
  /*
  getTransactions (){
    const transactionPool = TransactionPool.addTransaction(transaction);
    return transactionPool;
  };*/


  // Adding blocks to the chain 
  
  addBlockToChain( blck ) {

     const lastBlock = this.getLastBlock();

    // Prevent duplicate hashes
    if (this.chain.find(b => b.hash === blck.hash)) {
      console.log("[BLOCKCHAIN] Duplicate block ignored:", blck.hash);
      return this.chain;
    }

    // Check previous hash consistency
    if (lastBlock && blck.previousHash !== lastBlock.hash) {
      console.log("[BLOCKCHAIN] Invalid block: wrong previous hash");
      return this.chain;
    }
    
    this.chain.push(blck); 
    return this.chain; 
  };

  // Function to Replace the old chain with updated chain
  replaceChain(chain) {
    this.chain = chain;
  };

  static fromJSON(data){
    return new Blockchain(data.blocks);
  }


  // Function to check if the chain is valid
  static isValidChain(chain) {
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.GENESIS_DATA)) return false;

    for (let i=1; i<chain.length; i++) {
      const { timestamp, lastHash, hash, data } = chain[i];
      const actualLastHash = chain[i-1].hash;
      if (lastHash !== actualLastHash) return false;
      const validatedHash = cryptoHash(timestamp, lastHash, data);
      if (hash !== validatedHash) return false;
    }
    return true;
  }


};

//const newBlockChain = new Blockchain;

module.exports = Blockchain;
/*
Module exported to:
 - index.js
*/