
const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer( ( req, res ) => {
    res.writeHead( 200, { 'ContentType': 'text/plain' } );
    rest.end( 'Hello World\n' );
});

server.listen( port, hostname, () => {
    console.log( `Server running at http://${hostname}:${port}/` );
});