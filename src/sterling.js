/*
  Sterling, a dynamic Node.js HTTP server.
*/

var fs = require('fs');
var http = require('http');
var port = parseInt(process.argv[2], 10);
var mime = require('./lib/mime.js');
var url = require('url');

var version = '0.1';

if (process.argv.length < 3) {
  console.error("useage: node sterling.js <port>");
  process.exit(1);
}

function start(port) {
  http.createServer(function (req, res) {
    var req_data = url.parse(req.url, true);
    
    // Remove leading and trailing forward slashes.
    var path = req_data.pathname;
    var path_len = path.length - 1;
    if (path[path.length - 1] == '/') {
      --path_len;
    }
    req_data.pathname = req_data.filename = path.substr(1, path_len);
   
    // First, we check if path matches a static file in ./www
    // If not, then we'll try to see if it matches an Agent.
    // Otherwise, we'll throw a 404.
    findStaticFile(req_data, res);
  }).listen(port, "127.0.0.1");
  
  console.log('Sterling running at http://127.0.0.1:' + port + '/');
}

function sendHeader(res, code, headers) {
  headers['Server'] = 'Sterling/' + version;
  headers['Date'] = (new Date()).toUTCString();

  res.writeHead(code, headers);
}

function send404(res) {
  var msg = 'File not Found';

  sendHeader(res, 404, {'Content-Length': msg.length});
  res.write(msg);
  res.end();
}

function sendFile(res, file_path, stats) {
  fs.open(file_path, 'r', 0660, function(error, fd) {
    if (error) {
      send404();
      return false;
    }

    sendHeader(res, 200,
      {'Content-Length': stats.size, 'Content-Type': mime.get(file_path)});
    res.write(fd);
    res.end();

    fs.close(fd);
  });
}

function findStaticFile(req, res, stats) {
  var file_path = './www/' + req.filename.replace('/\.\.\//g', '');

  fs.stat(file_path, function(error, stats) {
    console.log(error);
    if (error) {
      // Looks like we weren't able to open this file.
      // Lets see if the path matches an Agent.
      findAgent(req, res);
      return false;
    }
    console.log(stats);
    if (stats.isDirectory()) {
      // Look for an index.html file.
      req.filename += '/index.html';
      findStaticFile(req);
      return false;
    }

    if (stats.isFile()) {
      sendFile(res, file_path, stats);
    } else {
      // Uhhh, this is awkward. 404 I guess.
      send404(res);
    }
  });
}

function findAgent(req, res) {
  // TODO: put real code here.
  send404(res);
}

// Let's get this party started.
start(parseInt(process.argv[2], 10));

