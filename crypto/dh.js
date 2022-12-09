const crypto = require('crypto');

const generateKey = () => {
    // Calling two getDiffieHellman method
    // with its parameter, groupName
    const diffiehellmangrp1 = crypto.getDiffieHellman('modp14');
    const diffiehellmangrp2 = crypto.getDiffieHellman('modp14');
    // Generating keys
    diffiehellmangrp1.generateKeys();
    diffiehellmangrp2.generateKeys();

    console.log(`Bob public key: ${diffiehellmangrp1.getPublicKey().toString('hex')}`);
    console.log(`Alice public key: ${diffiehellmangrp2.getPublicKey().toString('hex')}`);
    return diffiehellmangrp1.getPublicKey().toString('hex');
};

const computeSecret = () => {
    const diffiehellmangrp1 = crypto.getDiffieHellman('modp14');
    const diffiehellmangrp2 = crypto.getDiffieHellman('modp14');
    // Generating keys
    diffiehellmangrp1.generateKeys();
    diffiehellmangrp2.generateKeys();

    // Computing secret
    const diffiehellmangrp1sc = diffiehellmangrp1.computeSecret(diffiehellmangrp2.getPublicKey(), null, 'hex');

    const diffiehellmangrp2sc = diffiehellmangrp2.computeSecret(diffiehellmangrp1.getPublicKey(), null, 'hex');

    // Checking if both the secrets are same or not
    console.log(`Are computed secrets the same: ${diffiehellmangrp1sc === diffiehellmangrp2sc}`);
    return diffiehellmangrp1sc;
};

module.exports = { generateKey, computeSecret };
