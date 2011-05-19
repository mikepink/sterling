// Ignore me for now.
var fs = require('fs');
var queue = require('./queue.js');

var lock = queue.init();

exports.getAgents = function(callback) {
  lock.access(function() {
    
  });
}
