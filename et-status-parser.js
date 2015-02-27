var _ = require('lodash');
/**
 * Parses an ET server status received from the server
 *
 * Returns a structure that contains all the key-value
 * pairs in the status response and  a list of all players
 * @param status The actual status buffer
 * @returns {*} Object with keys and players. Keys is a javascript
 * object with all the server keys (sv_hostname etc.) and
 * players is an array with all the players
 */
function parseStatus(status) {
  var rows = status.toString().substr(4).split('\n');

  return {
    keys: parseKeys(rows[1]),
    players: parsePlayers(rows)
  };
}

exports.parseStatus = parseStatus;


/**
 * Parses the players out of the status string rows
 * @param rows status string rows
 * @returns {*} the players array
 */
function parsePlayers(rows) {
  var i = 2, length = rows.length, players = [];

  // length - 1 to ignore empty line in the end
  for (; i < length - 1; i++) {
    players.push(rows[i].split('"')[1]);
  }

  return players;
}

/**
 * Parses the server key-value-pairs from the status string
 * @param keyValueString The actual row in the status
 * @returns {*} keys and values as a javascript object
 */
function parseKeys(keyValueString) {
  var splitted = keyValueString.split('\\'),
    i = 0, length = splitted.length,
    keyValuePairs = {},
    key;

  for (; i < length; i++) {
    if (key) {
      keyValuePairs[key] = splitted[i];
      key = null;
    } else {
      key = splitted[i];
    }
  }

  return keyValuePairs;
}