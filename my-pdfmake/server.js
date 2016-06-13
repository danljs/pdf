var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var pdfmake = require('pdfmake/src/printer');
var app = express();

var rootDir = path.resolve(path.dirname(module.uri));

app.use(express.static(rootDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	res.send('Hello world!');
	console.log('/');
})

app.post('/pdf', function (req, res) {
	res.send('Hello pdf world!');
});

var server = http.createServer(app);
var port = process.env.PORT || 1234;
server.listen(port);

console.log('http server listening on %d', port);