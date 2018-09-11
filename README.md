# pirple-hw-assignment-1

I have build really simple Node.js RESTfull API.

The server is listening on 3000 port

The API exepts only "GET /hello" requests. other requests maid to this server will be responded with 404 error.

Anyway the webserver will always returns JSON with the folloaing format: 
{ 
  error: true/false, 
  message: null/string, 
  payload: JSON obj
}
