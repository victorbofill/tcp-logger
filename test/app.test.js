const server = require('../lib/app');
const net = require('net');
const assert = require('assert');
const fs = require('fs');

describe('Server Logging', () => {
    const PORT = 15677;

    beforeEach(done => {
        server.listen(PORT, done);
    });

    let client1 = null;
    beforeEach(done => {
        client1 = net.connect(PORT, () => {
            client1.setEncoding('utf8');
            done();
        });
    });

    let client2 = null;
    beforeEach(done => {
        client2 = net.connect(PORT, () => {
            client2.setEncoding('utf8');
            done();
        });
    });

    afterEach(() => {
        server.close();
    });

    afterEach(() => {
        client1.destroy();
        client2.destroy();
    });

    it('Client message is logged to server-log.txt', done => {
        const message1 = 'Is this thing on?';
        const message2 = 'It sure is!';

        client1.write(message1);
        client2.write(message2);

        const logFile = fs.readFile('./server-log.txt', 'utf8', (err, data) => {
            if (err) throw err;
            return data;
        });

        console.log('Log File: ', logFile);

        // TODO: Read server-log.txt and verify that the message logged is the message sent
        // * Split the file on line breaks (/n)
        // * Split each line on ** to separate message from log time
        // * Check the final split results against message1 and message2

        done();
    });

});