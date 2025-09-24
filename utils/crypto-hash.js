const crypto = require('crypto');

// Function to hash data using SHA256 Hash Algorithm

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');

    hash.update(inputs.sort().join(' '));

    return hash.digest('hex');
};



module.exports = cryptoHash;
/* 
Module Exported to: 
 - block.js, 
 - blockchain.js, 
 - txnPool.js, 

*/


/* Notes:

CRYSTALS-Dilithium – NIST’s selected primary post-quantum digital signature standard.

Security: Lattice-based (Module-LWE, Module-SIS).

Pros: Well-vetted, efficient on most platforms, backed by NIST.

Cons: Larger key sizes than ECDSA but manageable.

If you want hash-based:

SPHINCS+ – NIST’s backup standard.

Security: Based purely on hash functions.

Pros: Minimal assumptions beyond hash security.

Cons: Larger signatures and slower.
*/