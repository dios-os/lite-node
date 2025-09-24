const fs = require('fs');
const path = require('path');

//const { createClient } = require('@supabase/supabase-js');
//import { S3Client } from '@aws-sdk/client-s3';


//const SUPABASE_URL = process.env.SUPABASE_URL;
//const SUPABASE_KEY = process.env.SUPABASE_KEY;
//const BUCKET_ID = process.env.BUCKET_ID;
//SERVICE_ROLE_KEY= process.env.SERVICE_ROLE_KEY;
//const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);


//const filePath = '../blockchain.json';

// Function to Synchronize Each Nodes Chain with the latest Chain
// this function saves the latest chain to a file and uploads this to supabase
/*
function startBlockchainSync(blockchain, intervalMs = 300000) {
    setInterval(async () => {
        const jsonData = JSON.stringify(blockchain.chain, null, 2);
        //console.log(jsonData);

        try {
            fs.writeFileSync(filePath, jsonData, 'utf-8');
            console.log('Blockchain written to file.');

            /*
            console.log(`Uploading to Supabase bucket: ${BUCKET_ID}`);
            const { data, error } = await supabase
                .storage
                .from(BUCKET_ID)
                .upload('blockchain.json', fs.readFileSync(filePath), {
                    contentType: 'application/json',
                    upsert: true
                });

            if (error) {
                console.error('Error uploading file:', error);
            }
            
        } catch (err) {
            console.error('Blockchain file state sync error:', err.message);
        }
    }, intervalMs);
}
    */

function loadBlockchainFromFile(fp) {
    if (!fs.existsSync(fp)) {
        throw new Error('Blockchain file not found.');
    }

    const rawContent = fs.readFileSync(fp, 'utf-8');
    if (!rawContent) {
        throw new Error('Blockchain file is empty.');
    }

    let chain;
    try {
        chain = JSON.parse(rawContent);
    } catch (err) {
        throw new Error('Failed to parse blockchain JSON.');
    }

    if (!Array.isArray(chain) || chain.length === 0) {
        throw new Error('Invalid blockchain data.');
    }

    return chain; 
}

/*
function startBlockchainSync( filePath, newChain ) {

    const tempPath = `${filePath}.tmp`;
    console.log("TEST NEW CHAIN", newChain)
    const jsonData = JSON.stringify(newChain, null, 2);

    try {
        fs.writeFileSync(tempPath, jsonData, 'utf-8');
        fs.renameSync(tempPath, filePath);
        console.log('Blockchain written to file.');
        
    } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        throw new Error(`Blockchain file state sync error: ${err.message}`);
    }
}
*/

module.exports = { /*startBlockchainSync,*/ loadBlockchainFromFile };
/*
Module exported to:
 - index.js
*/