const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const PORT = 4000;
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000'
    }
});
const rsa = require('./crypto/rsa.js');
const ecc = require('./crypto/ecc.js');
const sha256 = require('./crypto/sha256.js');
const dsa = require('./crypto/dsa.js');
const hill = require('./crypto/hill_cipher.js');

let eccEncrypted = null;

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
let users = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('message', (data) => {
        console.log('Emit: ', data);
        socketIO.emit('messageResponse', data);
    });

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    socket.on('newUser', (data) => {
        users.push(data);
        socketIO.emit('newUserResponse', users);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter((user) => user.socketID !== socket.id);
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello' });
});

// RSA

app.post('/rsa-encrypt', jsonParser, (req, res) => {
    console.log('rsa-encrypt');

    const encrypted = rsa.encrypt(req.body.message);
    res.json({ message: encrypted.toString('base64') });
});

app.post('/rsa-decrypt', jsonParser, (req, res) => {
    console.log('rsa-decrypt');
    const decrypted = rsa.decrypt(req.body.message);
    res.json({ message: decrypted.toString('base64') });
});

// ECC

app.post('/ecc-encrypt', jsonParser, async (req, res) => {
    console.log('ecc-encrypt');

    const encrypted = await ecc.encrypt(req.body.message);

    eccEncrypted = encrypted;

    res.json({ message: encrypted });
});

app.post('/ecc-decrypt', jsonParser, async (req, res) => {
    console.log('ecc-decrypt');
    const decrypted = await ecc.decrypt(eccEncrypted);
    res.json({ message: decrypted.toString('base64') });
});

// SHA256 Generate
app.post('/sha-generate', jsonParser, async (req, res) => {
    console.log('sha-generate');

    const hash = sha256.generateHash(req.body.message);

    res.json({ message: `${req.body.message} - hash: ${hash}` });
});

// DSA Generate
app.post('/dsa-generate', jsonParser, async (req, res) => {
    console.log('dsa-generate');

    const signature = dsa.signature(req.body.message);

    res.json({ message: `${req.body.message} - ${signature}` });
});

// DSA Generate
app.post('/hill-encrypt', jsonParser, async (req, res) => {
    console.log('hill-encrypt');

    const encrypted = hill.encrypt(req.body.message, req.body.key);

    res.json({ message: encrypted });
});

app.post('/hill-decrypt', jsonParser, async (req, res) => {
    console.log('hill-decrypt');

    const decrypted = hill.decrypt(req.body.message, req.body.key);

    res.json({ message: decrypted });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
