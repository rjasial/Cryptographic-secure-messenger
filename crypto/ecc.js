const eccrypto = require('eccrypto');

const privateKeyA = eccrypto.generatePrivate();
const publicKeyA = eccrypto.getPublic(privateKeyA);
const privateKeyB = eccrypto.generatePrivate();
const publicKeyB = eccrypto.getPublic(privateKeyB);

const encrypt = async (message) => {
    const encrypted = await eccrypto.encrypt(publicKeyB, Buffer.from(message));
    return encrypted;
};

const decrypt = async (encrypted) => {
    console.log(encrypted);
    const decrypted = await eccrypto.decrypt(privateKeyB, encrypted).then((plaintext) => plaintext.toString());

    return decrypted;
};

module.exports = { encrypt, decrypt };
