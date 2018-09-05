// Tim Woolley 2018

const MongoClient = require('mongodb').MongoClient;
var rp = require('request-promise');
const assert = require('assert');
const Player = require('./Player.js');

let user = new Player("Tim", 5);
console.log("***START***");

// Connection URL
const url = 'mongodb+srv://twoolley:test@cluster0-jjfxc.mongodb.net/test?retryWrites=true';
// Database Name
const dbName = 'world_state';
var tester = null;

function getPlayerData() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      console.log("Connecting from getPlayerData");
      db.collection("player").findOne({"name": "Tim"}, function(err, result) {
        if (err) {
          throw err;
          reject("oops");
        } else {
          console.log(result);
          resolve(result);
          client.close();
          console.log("Closing connection from getPlayerData")
        }
      });
    });
  });
}

// usage
getPlayerData().then(function(value) {
  console.log("Getting the carryover variable")
  console.log(value);
  console.log("The player money is " + user.playerMoney);
  console.log("The player location is" + user.playerLocation);
}, function(err) {
  console.log("Error! " + err);
});

console.log("****END****");
