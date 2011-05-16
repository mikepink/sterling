/*
  Sterling, a NodeJS blogging platform.
*/

var http = require('http');

if (process.argv.length < 3) {
  console.error("useage: node sterling.js <port>");
  process.exit(1);
}
var port = parseInt(process.argv[2], 10);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, "127.0.0.1");


console.log('Sterling running at http://127.0.0.1:' + port + '/');
