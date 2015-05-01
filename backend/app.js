//Require routes
var router = require('./router.js');

var http = require('http');
var port = process.env.PORT || 3000;

module.exports = function (root) {
	http.createServer(function (request, response) {
		router.static(request, response);
		router.home(request, response);
	}).listen(port);
	console.log('Server running at http://127.0.0.1:' + port + '/');
};
