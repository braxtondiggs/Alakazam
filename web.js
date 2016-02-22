var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.post('/*', function(req, res) {
    return res.sendFile(__dirname + "/dist/index.html");
});
app.listen(process.env.PORT || 5000);
/*app.post('/', function(req, res) {
	res.send();
});*/