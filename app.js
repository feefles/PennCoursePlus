var connect = require('connect'),
    http = require('http'),
    directory = '/';

// var requirejs = require('requirejs'), 
//     fs = require('fs');

connect()
    .use(connect.static(directory))
    .listen(80);

console.log('Listening on port 80.');