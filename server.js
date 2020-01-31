// Require the http server
const http    = require('http');
const cluster = require('cluster');
// Handles the requests made to this server
const requests_handler = require('./request_handler');

// Container for the server
const server = {};
module.exports = server;

// Starting up the app
server.start = () => {
    // Create the server
    const httpServer = http.createServer((req, res) => {
        // Handel what actions should the server do once http request is committed
        requests_handler.execute_request(req, res);
    });

    // Start the server - listens on port 3000, e.g http://localhost:3000/<routes>
    httpServer.listen(3000, () => {
        console.log(`Worker #${cluster.worker.id} is on. Server is listening on port 3000`);
        console.log(`====================================================================`);
    });
}