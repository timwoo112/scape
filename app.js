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

function readMoney() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      //put commands under this line
      console.log("Connected from readMoney");

      db.collection("player").findOne({}, function(err, result) {
        if (err)
          throw err;
        console.log(result.money);
        resolve(result.money);
        console.log("Closing connection from readMoney")
      });
    });
  });
}

// Read location function. Returns an array of coordinates.
function readLocation() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      //put commands under this line
      console.log("Connecting from readLocation");

      db.collection("player").findOne({}, function(err, result) {
        if (err)
          throw err;
        resolve(result.location);
        console.log("Closing connection from readLocation")
      });
    });
  });
}

// Try out the await keyword
function combineAllFunctions() {
  return new Promise(function(resolve, reject) {
    readMoney().then(function(data) {
      user.playerMoney = data;
      console.log("Test inside" + user.playerMoney);
    }, function(err) {
      console.log("Error! " + err);
    });

    readLocation().then(function(data) {
      user.playerLocation = data;
      console.log(user.playerLocation);
    }, function(err) {
      console.log("Error! " + err);
    });
    resolve("Success!!!");
  });
}
// usage
combineAllFunctions().then(function() {
  console.log("The player money is " + user.playerMoney);
  console.log("The player location is" + user.playerLocation);
}, function(err) {
  console.log("Error! " + err);
});

console.log("****END****");
