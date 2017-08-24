
var express = require( "express" );
var path    = require( "path" );
var bodyParser = require( "body-parser" );
var nodemailer = require( "nodemailer" );

var app = express();

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: false } ) );

app.use( express.static( path.join( __dirname, 'public' ) ) );

const port = 3000

app.get( '/', (req, res) => {
    res.render( 'index', {title: "Welcome"} );
});

app.get( '/about', (req, res) => {
    res.render( 'about' );
});

app.listen( port );
console.log( `Server is running on port ${port}` );