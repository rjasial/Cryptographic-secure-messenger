const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'secret'
    }
});

// const publicKey = crypto.createPublicKey(
//     'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjfc/kCbYuc0Yv03on97ep6TR4lywgBlggnYNIn8Op21K2M4Th7kCxSKuC+UdjCVGjlNkDMt7Rz7tiI5IllNGWj3zX/XXx+lnMhw+rQVjil9AjawDyC53onlzgz+6NIlQTDE0QVT9qKRF0Gv6/tdcOv3EoV0HrClbcADgueAvJkwIDAQAB'
// );

// const privateKey = crypto.createPrivateKey(
//     'MIICXAIBAAKBgQCjfc/kCbYuc0Yv03on97ep6TR4lywgBlggnYNIn8Op21K2M4Th7kCxSKuC+UdjCVGjlNkDMt7Rz7tiI5IllNGWj3zX/XXx+lnMhw+rQVjil9AjawDyC53onlzgz+6NIlQTDE0QVT9qKRF0Gv6/tdcOv3EoV0HrClbcADgueAvJkwIDAQABAoGAH78wfUF9hOuRd3wDPnuVyIKmU7xXLyjMOBkeAx4y6mrSVtsONKkFGufXlik9uXd3yOIAeeSI7AkAhAAQQwfw4pIm2JNFnW5znd+8cu7+Zw5ye4tlUfN1K+aqqboqfK4HCG4CvW3o3ORjoYM+T3FJ9/iLFs2T8loXnpfWEO6XppECQQDQcgT+xmkvxzCNt3IEFSslIYxgYPfYtzfQ9JRlUVLkDQQGFn8C7W7uyLTvQ25tIgG70u0hNb6asYhPPO05O/l3AkEAyMpRFNmafgd6eSg2byqR+W4jNt0F+Kl4Msg+zRlolLP1iToo3VuzlqXOhae136GschNSQEBlmxj7Wfw+xyX3xQJAHnQ6JJsKbS+V+W6O2ufY2ODw6HfiXihOoFnLgI4EJUt9hgItZlkYNwzd2oMolAs+45kqigqXIXTErIcDRbRsewJBAI2A10dkW1Y6GvvLdSE+1QT9s190wEKP3B+ds3SDVYqGkKGXFTl66MNgMn1KxgfGPmteZnbVa0W0g17VP8DFZykCQCNp5HbRj/J3DrdB7Wdg+xswnywfPonZdi8Ai94MMkh8JPTOHYJlAk/POVFfiFl/jp13cQpXjBQVLgGQVQ8t2Pw='
// );

const data = 'my secret data';

// console.log(publicKey.toString('base64'));
// console.log(privateKey.toString('base64'));

const encrypt = (message) => {
    console.log(privateKey);
    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
            passphrase: 'secret'
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(message, 'base64')
    );

    console.log(encryptedData);
    return encryptedData;
};

const decrypt = (encrypted) => {
    console.log(Buffer.from(encrypted, 'base64'));
    const decryptedData = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
            passphrase: 'secret'
        },
        Buffer.from(encrypted, 'base64')
    );
    return decryptedData;
};

// console.log("encypted data: ", encryptedData.toString("base64"));

//   // The decrypted data is of the Buffer type, which we can convert to a
//   // string to reveal the original data
//   console.log("decrypted data: ", decryptedData.toString());

module.exports = { encrypt, decrypt };
