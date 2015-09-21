/**
 * clouds-gate
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var createClient = require('clouds-base').createClient;
var common = require('./common');
var debug = common.debug('init-gate');


module.exports = function (gate) {

  var client = createClient({
    path: common.default.listenPath
  });

  client.register('$Gate.memoryUsage', function (callback) {
    callback(null, process.memoryUsage());
  });

  client.register('$Gate.connections', function (callback) {
    callback(null, gate._clientCounter);
  });

  client.register('$Gate.servicesTable.list', function (callback) {
    var services = [];
    for (var i in gate._servicesTable._services) {
      if (gate._servicesTable._services[i].length > 0) {
        services.push(i);
      }
    }
    callback(null, services);
  });

  client.register('$Gate.servicesTable.counter', function (callback) {
    var counters = {};
    for (var i in gate._servicesTable._counters) {
      counters[i] = gate._servicesTable._counters[i];
    }
    callback(null, counters);
  });

};
