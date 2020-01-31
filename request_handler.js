// Define basic router- each route should be defined with specific HTTP methods
const router = require('./router');
// Require the url module
const url = require('url');

const requests_handler = {}
module.exports = requests_handler;

requests_handler.execute_request = (req, res) => {
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