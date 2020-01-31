// Container for router
const router = {};

module.exports = router;

// Container for the hello route
const hello = {};

hello.get = (callback) => {
    callback(200, {
        error: false,
        message: null,
        payload: {
            hello: "world (GET)"
        }
    });
}

hello.post = (callback) => {
    callback(200, {
        error: false,
        message: null,
        payload: {
            hello: "world (POST)"
        }
    });
}
// Add hello route to the main router
router.hello = hello;

// Add default not_found rout
router.not_found = (callback) => {
    const allowed_requests = [];
    Object.keys(router).forEach((allowed_method) => {
        if (allowed_method != 'not_found') {
            Object.keys(router[allowed_method]).forEach((allowed_http) =>{
                allowed_requests.push(`${allowed_http.toUpperCase()} / ${allowed_method}`);
            }); 
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

