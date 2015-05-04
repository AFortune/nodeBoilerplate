var path = require('path');
var fs = require('fs');


//Require the template renderer
var renderer = require('./render.js');

//Serve static files
function assets(request, response) {
    //Give a path for static files
    var filePath = './' + request.url;

    //We need to change the contentType as we don't want to render the css or js as html
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    //This acts as a mini MIME
    switch (extname.toLowerCase()) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.jpg' || '.jpeg':
            contentType = 'image/jpeg';
            break;
    }

    //Handle what to do if path does or does not exist
    path.exists(filePath, function (exists) {
        if (exists) {
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
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