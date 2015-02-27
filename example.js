// We use the enemy-territory-query library to query the
// server
var etQuery = require('enemy-territory-query');

var statusParser = require('./et-status-parser');

// Send a query to the server
etQuery.getStatus({
  address: 'et.etjump.com',
  port: 27960
}, function (status, rinfo, err) {
  if (err) throw err;

  // Parse the status
  var parsedStatus = statusParser.parseStatus(status);

  console.log('Server host name', parsedStatus.keys.sv_hostname);
  console.log('Server players: ', parsedStatus.players.join(', '));
});
