/**
 * clouds-gate
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var common = require('../src/common');
var createClient = require('clouds-base').createClient;

var clients = [];
var MAX_CONNECTIONS = 1000;

function getRandomIndex () {
  return parseInt(Math.random() * clients.length, 10);
}

function newClient () {
  var c = createClient({
    path: common.default.listenPath
  });
  clients.push(c);
}

function removeClient () {
  var i = getRandomIndex();
  var c = clients[i];
  clients.splice(i, 1);
  if (c) c.exit();
}


function testConnections () {
  console.log('connections: %s', clients.length);
  for (var i = 0; i < 50; i++) {
    newClient();
  }
  while (clients.length > MAX_CONNECTIONS) {
    removeClient();
  }
  setTimeout(testConnections, 1000);
}
testConnections();


function testCall () {
  var s = 0;
  for (var i = 0; i < 100; i++) {
    var c = clients[getRandomIndex()];
    if (c) {
      s++;
      c.register('hello', function (msg, callback) {
        callback(null, 'hello, ' + msg);
      });
      c.register('timestamp' + (Date.now() % 100), function () {
        callback(new Error('test'));
      });
      c.register('lost', function () {});
    }
  }
  for (var i = 0; i < 100; i++) {
    var c = clients[getRandomIndex()];
    if (c) {
      s++;
      c.call('hello', ['ok'], console.log);
      c.call('timestamp' + (Date.now() % 100), console.log);
      c.call('lost', [], console.log);
      c.call('undefined', [], console.log);
    }
    console.log('test calls: %s', s);
  }
  setTimeout(testCall, 500);
}
testCall();
