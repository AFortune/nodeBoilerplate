//Require routes
var router = require('./router.js');

var http = require('http');
var port = process.env.PORT || 3000;

module.exports = function (root) {
    http.createServer(function (request, response) {
        router.static(request, response);
        router.home(request, response);
    }).listen(port);

    console.log('Server running at http://' + getIP() + ':' + port + '/');
};

function getIP() {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var ip = '';
    
    for (var dev in ifaces) {
        var alias = 0;
        ifaces[dev].forEach(function(details) {
            if (details.family === 'IPv4') {
                if (dev === 'Local Area Connection') ip = details.address;                
                ++alias;
            }
        });
    }
    
    return ip;
}