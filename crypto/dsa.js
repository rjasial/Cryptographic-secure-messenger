const crypto = require('crypto');
const env = require('../env/index.js');

const signature = (message) => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048
    });

    // Convert string to buffer
    const data = Buffer.from(message);

    // Sign the data and returned signature in buffer
    const sign = crypto.sign(env.DSA, data, privateKey);

    // Convert returned buffer to base64
    const signature = sign.toString('base64');

    // Printing the signature
    return `🖊️ Signature:\n\n ${signature}`;
};

module.exports = { signature };
