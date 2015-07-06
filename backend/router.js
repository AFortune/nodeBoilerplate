var path = require('path');
var fs = require('fs');

//Determine MIME types to use for different file extensions
var mimeTypes = require('./mime-types.js');

//Require the template renderer
var renderer = require('./render.js');


//Serve static files
function assets(request, response) {
	//Give a path for static files
	var filePath = './' + request.url;

	//Determine the correct contentType to use
	var extname = path.extname(filePath).toLowerCase();
	var contentType = 'text/html';
	if (mimeTypes[extname]) contentType = mimeTypes[extname];

	//Handle what to do if path does or does not exist
	fs.exists(filePath, function (exists) {
		if (exists) {
			fs.readFile(filePath, function (error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				} else {
					response.writeHead(200, {
						'Content-Type': contentType
					});
					response.end(content, 'utf-8');
				}
			});
		} else {
			response.writeHead(404);
			response.end();
		}
	});
}

//Make sure the views are rendered as html
var header = {
	'Content-Type': 'text/html'
};

//Handle HTTP route GET '/' and POST '/'
function home(request, response) {
	if (request.url === '/') {
		if (request.method.toLowerCase() === "get") {
			//The values that will be passed to our views
			var values = {
				title: 'Home',
				headline: 'Node.js Boilerplate'
			};
			response.writeHead(200, header);
			//Render the templates
			renderer.view('layout/header.html', values, response);
			renderer.view('homePage.html', values, response);
			renderer.view('layout/footer.html', {}, response);
			//Make sure to end the request
			response.end();
		}
	}
}


//Export our routes
module.exports.home = home;
module.exports.static = assets;