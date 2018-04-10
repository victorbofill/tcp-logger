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
    const message1 = 'Is this thing on?';
    beforeEach(done => {
        client1 = net.connect(PORT, () => {
            client1.setEncoding('utf8');
            client1.write(message1);
            done();
        });
    });

    let client2 = null;
    const message2 = 'It sure is!';
    beforeEach(done => {
        client2 = net.connect(PORT, () => {
            client2.setEncoding('utf8');
            client2.write(message2);
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

    let logFile;
    let firstMessage;
    let secondMessage;

    it('First message is successfully logged to server-log.txt', done => {
        setTimeout(() => {
            fs.readFile('./test/server-log.txt', 'utf8', (err, data) => {
                if (err) throw err;
                logFile = data;
            });
        }, 30);

        setTimeout(() => {
            const firstSplit = logFile.split('\n');
            firstMessage = firstSplit[0].split(' ** ');
    
            assert.deepEqual(firstMessage[1], message1);
        }, 50);
        done();
    });
    
    it('Second message is successfully logged to server-log.txt', done => {
        setTimeout(() => {
            fs.readFile('./test/server-log.txt', 'utf8', (err, data) => {
                if (err) throw err;
                logFile = data;
            });
        }, 30);

        setTimeout(() => {
            const firstSplit = logFile.split('\n');
            secondMessage = firstSplit[1].split(' ** ');
    
            assert.deepEqual(secondMessage[1], message2);
        }, 50);
        done();
    });

    it('Time is correctly logged', done => {
        setTimeout(() => {
            const d = new Date(firstMessage[0]);
            isNaN(d.getTime());
        }, 80);
        done();
    });
});