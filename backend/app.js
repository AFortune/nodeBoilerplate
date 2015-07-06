//Require routes
var router = require('./router.js');

var http = require('http');
var port = process.env.PORT || 3000;

// To get local IP
var os = require('os');
var interfaces = os.networkInterfaces();


function getLocalAddress() {
    var addresses = [];

    for (var dev in interfaces) {
        if (dev) {
            for (var dev2 in interfaces[dev]) {
                if (dev2) {
                    var address = interfaces[dev][dev2];
                    if (address.family === 'IPv4' && !address.internal) {
                        addresses.push(address.address);
                    }
                }
            }
        }
    }

    return addresses;
}


module.exports = function(root) {
    http.createServer(function(request, response) {
        router.static(request, response);
        router.home(request, response);
    }).listen(port);

    console.log('Server running at http://' + getLocalAddress() + ':' + port + '/');
};
