// Require the http server
var http = require('http');

// Require the string decoder
var string_decoder = require('string_decoder').StringDecoder;

// Require the url module
var url = require('url');

// Handels the requests made to this server
var requests_handeler = function(req, res) {
    // Extract the url from the request
    var parsed_url   = url.parse(req.url, true);
    var trimmed_path = parsed_url.pathname.replace(/^\/+|\/+$/g, '');

    // Get the current http method
    var http_method = req.method.toLowerCase();

    // Set default request method to not found
    var requested_method = router.not_found;
    
    // Check if correct request and HTTP method where given
    // If so - set route accordingly
    if (router.hasOwnProperty(trimmed_path)) {
        if (router[trimmed_path].hasOwnProperty(http_method)) {
            requested_method = router[trimmed_path][http_method];
        }
    }
      
    // Execute the request according to the router
    requested_method(function(status,payload){
        // Set headers - alway return JSON response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(status);

        // Set response body
        res.end(JSON.stringify(payload));
    });
}

// Defind basic router- each route should be defined with specific HTTP methods
var router = {
    hello: {
        // Hndels GET /hello
        get: function(callback){
            callback(200, {
                error: false,
                message: null,
                payload: {
                    hello: "world (GET)"
                }
            });
        },

        // Hndels POST /hello
        post:  function (callback) {
            callback(200, {
                error: false,
                message: null,
                payload: {
                    hello: "world (POST)"
                }
            });
        }
    },

    // Default router - handels 404 response
    not_found: function (callback) {
        var allowed_requests = [];
        Object.keys(router).forEach(function(allowd_nethod){
            if (allowd_nethod != 'not_found') {
                allowed_requests.push('"GET /' + allowd_nethod +'"');
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
var httpServer = http.createServer(function(req, res){
    // Handel what actions should the server do once http request is commited
    requests_handeler(req, res);
});

// Start the server - listens on port 3000, e.g http://localhost:3000/<routes>
httpServer.listen(3000, function(){
    // Write internl messgaes 
    console.log('Server is listening on port 3000');
});



