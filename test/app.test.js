const server = require('../lib/app');
const net = require('net');
const assert = require('assert');

describe('Server Logging', () => {
    const PORT = 15677;

    beforeEach(done => {
        app.listen(PORT, done);
    });

    let client = null;
    beforeEach(done => {
        client = net.connect(PORT, () => {
            client.setEncoding('utf8');
            done();
        });
    });

    afterEach(() => {
        app.close();
    });

    afterEach(() => {
        client.destroy();
    });

    it('Client message is logged to server-log.txt', done => {

        // This code will read server-log.txt and verify that the message logged is the message sent

    });

});

// This code will test whether a message is logged to server-log.txt