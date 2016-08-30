onmessage = function(e) { // eslint-disable-line
  setInterval(function() { // eslint-disable-line
    postMessage(true);
  }, 20);
};
