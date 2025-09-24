
//Defining wallet starting token and currency balances 

const STARTING_TOKEN_BALANCE = 100;


// Function to get time accurate time
function getCurrentTimeWithMilliseconds() {
    const now = new Date();
    return now.toISOString().split("T")[1].slice(0, 12); 
  };
  
  

module.exports = { STARTING_TOKEN_BALANCE, getCurrentTimeWithMilliseconds };
/*
Module exported to:
 - supabaseClient.js
 - pubsub.js
 - txnPool.js
*/