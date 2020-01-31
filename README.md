# pirple-hw-assignment-6

This is part of my learning Node.js course in (Pirple)[https://pirple.thinkific.com/]

I have refactored the first hello-world assignment

Basicity this is a simple Node js API.

The server that listens on port 3000.

This API expects only `GET /hello` or `POST /hello` requests. 
All other requests maid to this server will be responded with `404` error.

Anyway the webserver will always returns JSON with the following format 
``` javascript
{ 
    error: true/false, 
    message: null/string, 
    payload: {JSON obj} 
}
```
