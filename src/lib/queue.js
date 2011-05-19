/**
  * Simple queueing system.
*/

exports.init = function() {
  var queue = [];
  var busy = false;

  return {
    'access': function(callback) {
      if (!busy && !queue.length) {
        busy = true;
        callback.call();
      } else {
        queue.push(callback);
      }
    },
    'next': function() {
      if (queue.length) {
        queue.shift().call();
      } else {
        busy = false;
      }
    }
  };
};

