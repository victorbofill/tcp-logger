const net = require('net');
const Clients = require('./Clients.js');
const fs = require('fs');

const clients = new Clients;

const server = net.createServer(client /* this is the client's socket */ => {
    client.setEncoding('utf8');
    clients.add(client);

    client.on('data', data => {
        const date = new Date();
        const message = `${date} ** ${data}\n`;

        fs.appendFileSync('./test/server-log.txt', message, (err) => {
            if (err) throw err;
        });
    });

    client.on('close', () => {
        clients.remove(client);
    });
});

module.exports = server;