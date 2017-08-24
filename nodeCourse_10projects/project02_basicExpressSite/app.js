
var express = require( "express" );
var path    = require( "path" );
var bodyParser = require( "body-parser" );
var nodemailer = require( "nodemailer" );

var app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: false } ) );

const port = 3000

app.get( '/', (req, res) => {
    res.send( "Hello World!" );
});

app.listen( port );
console.log( `Server is running on port ${port}` );