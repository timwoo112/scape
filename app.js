// Tim Woolley 2018

const MongoClient = require('mongodb').MongoClient;
var rp = require('request-promise');
const assert = require('assert');
const Player = require('./Player.js');

let user = new Player("Tim", 5);
console.log("***START***");

// Get the player data using a promise and set the value to the user object
user.getPlayerData().then(function(value) {
  // Get value from promise
  user.playerDataArray = value
  // Set player name
  user.playerName = user.playerDataArray.name;
  console.log("Set player name to " + user.playerName);
  // Set player money
  user.playerMoney = user.playerDataArray.money;
  console.log("Set player money to " + user.playerMoney);
  // Set player location
  user.playerLocation = [user.playerDataArray.lat, user.playerDataArray.long];
  console.log("Set player location to(lat,long): " + user.playerLocation);
}, function(err) {
  console.log("Error! " + err);
});
