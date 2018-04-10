const net = require('net');
const log = require('./server-log');
const Clients = require('./Clients.js');
const fs = require('fs');

const clients = new Clients;

const server = net.createServer(client /* this is the client's socket */ => {
    client.setEncoding('utf8');
    clients.add(client);

    client.on('data', data => {
        // This will take in a message and log it to server-log.txt
    });

    client.on('close', () => {
        clients.remove(client);
    });
});

module.exports = server;