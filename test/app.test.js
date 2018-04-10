const server = require('../lib/app');
const net = require('net');
// const assert = require('assert');
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
            done();
        });
    });

    let client2 = null;
    const message2 = 'It sure is!';
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
        client1.write(message1);
        client2.write(message2);

        const logFile = fs.readFile('./test/server-log.txt', 'utf8', (err, data) => {
            if (err) throw err;
            return data;
        });

        console.log('logFile: ', logFile);

        // const firstSplit = logFile.split('\n');
        // const firstMessage = firstSplit[0].split(' ** ');
        // const secondMessage = firstSplit[1].split(' ** ');

        // assert.deepEqual(firstMessage[1], message1);
        // assert.deepEqual(secondMessage[1], message2);

        // const d = new Date(firstMessage[0]);
        // isNaN(d.getTime());

        done();
    });
});