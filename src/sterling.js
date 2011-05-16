/*
  Sterling, a NodeJS blogging platform.
*/

var http = require('http');
var mysql = require('./config/mysql.js').config;
var url = require('url');

if (process.argv.length < 3) {
  console.error("useage: node sterling.js <port>");
  process.exit(1);
}
var port = parseInt(process.argv[2], 10);

http.createServer(function (req, res) {
  var req_data = url.parse(req.url);
  
  // Parse the path and see if it's registered.
  var path = req_data.pathname;
  if (path[path.length - 1] == '/') {
    path = path.substr(0, path.length - 1);
  }

  

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World<br />' + path + '\n');
}).listen(port, "127.0.0.1");


console.log('Sterling running at http://127.0.0.1:' + port + '/');
