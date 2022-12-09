const { createHash } = require('crypto');

const generateHash = (string) => {
    return createHash('sha256').update(string).digest('hex');
};

module.exports = { generateHash };
