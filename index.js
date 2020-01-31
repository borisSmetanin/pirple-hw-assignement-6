// Require the http server
const http = require('http');

// Require the string decoder
const string_decoder = require('string_decoder').StringDecoder;

// Require the url module
const url = require('url');

// Handles the requests made to this server
const requests_handler = (req, res) => {
    // Extract the url from the request
    const parsed_url   = url.parse(req.url, true);
    const trimmed_path = parsed_url.pathname.replace(/^\/+|\/+$/g, '');

    // Get the current http method
    const http_method = req.method.toLowerCase();

    // Set default request method to not found
    let requested_method = router.not_found;
    
    // Check if correct request and HTTP method where given
    // If so - set route accordingly
    if (router.hasOwnProperty(trimmed_path)) {
        if (router[trimmed_path].hasOwnProperty(http_method)) {
            requested_method = router[trimmed_path][http_method];
        }
    }
      
    // Execute the request according to the router
    requested_method((status, payload) => {
        // Set headers - alway return JSON response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(status);

        // Set response body
        res.end(JSON.stringify(payload));
    });
}

// Define basic router- each route should be defined with specific HTTP methods
const router = {
    hello: {
        // Handles GET /hello
        get: (callback) => {
            callback(200, {
                error: false,
                message: null,
                payload: {
                    hello: "world (GET)"
                }
            });
        },

        // Handles POST /hello
        post:  (callback) => {
            callback(200, {
                error: false,
                message: null,
                payload: {
                    hello: "world (POST)"
                }
            });
        }
    },

    // Default router - handles 404 response
    not_found: (callback) => {
        const allowed_requests = [];
        Object.keys(router).forEach((allowed_method) => {
            if (allowed_method != 'not_found') {
                allowed_requests.push(`GET / ${allowed_method}`);
            }
        });

        callback (404, {
            error: true,
            message: 'Request not found in this server, pleas use one of the allowed requests',
            payload: {
                allowed_requests: allowed_requests
            }
        });
    }
};

// Create the server
var httpServer = http.createServer((req, res) => {
    // Handel what actions should the server do once http request is committed
    requests_handler(req, res);
});

// Start the server - listens on port 3000, e.g http://localhost:3000/<routes>
httpServer.listen(3000, () => {
    console.log('Server is listening on port 3000');
});



