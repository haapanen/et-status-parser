/**
 * Created by Jussi on 27.2.2015.
 */
var etQuery = require('enemy-territory-query');
var statusParser = require('../et-status-parser');

describe('ET Query test', function () {
  it('should have correct properties', function (done) {
    etQuery.getStatus({
      address: 'et.etjump.com',
      port: 27960
    }, function (status, rinfo, err) {
      if (err) {
        throw "ERROR: couldn't connect to test server.";
      }

      var status = statusParser.parseStatus(status);

      if (!status.keys.sv_hostname) {
        throw "ERROR: status doesn't have sv_hostname";
      }

      done();
    });
  });
});