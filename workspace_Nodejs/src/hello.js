var http = require('http');
var url  = require('url');
var dt   = require('./date');

var PUTRequest = require('./CreateApis/PUTRequest');
http.createServer(function (req, res) {
	if (req.url = '/dispatchorders') {
		
	}
    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("The date and time are currently: " + dt.myDateTime());
	var q = url.parse(req.url,true).query;
	res.write(q.year);
    res.end('Hello World!');
}).listen(8080);