/*
  Sterling, a NodeJS blogging platform.
*/

var http = require('http');
var url = require('url');

if (process.argv.length < 3) {
  console.error("useage: node sterling.js <port>");
  process.exit(1);
}
var port = parseInt(process.argv[2], 10);

http.createServer(function (req, res) {
  var req_data = url.parse(req.url, true);
  
  // Remove leading and trailing forward slashes.
  var path = req_data.pathname;
  var path_len = path.length - 1;
  if (path[path.length - 1] == '/') {
    --path_len;
  }
  req_data.pathname = path.substr(1, path_len);
 
  // First, we check if path matches a static file in ./www
  // If not, then we'll try to see if it matches an Agent.
  // Otherwise, we'll throw a 404.
  findStaticFile(req_data);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, "127.0.0.1");

function findStaticFile(req_data) {

}

console.log('Sterling running at http://127.0.0.1:' + port + '/');
