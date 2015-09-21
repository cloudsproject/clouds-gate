/**
 * clouds-gate
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var createDebug = require('debug');
var common = module.exports = exports = require('lei-utils').extend(exports);


exports.debug = function (name) {
  return createDebug('clouds:gate:' + name);
};

var debug = exports.debug('common');


exports.default = {};
exports.default.reconnectWaiting = 500;
exports.default.listenPath = '/tmp/clouds-gate.sock';
exports.default.statusInterval = 5000;


exports.reconnectWaiting = function () {
  return parseInt(Math.random() * exports.default.reconnectWaiting, 10);
};

exports.callback = function (fn) {
  if (fn) return fn;
  return function (err) {
    debug('unhandle callback: error=%s, results=%j', err, arguments);
  };
};

exports.takeChar = function (c, n) {
  if (isNaN(n)) n = 80;
  var s = '';
  for (i = 0; i < n; i++) {
    s += c;
  }
  return s;
};
