// Tim Woolley 2018
const MongoClient = require('mongodb').MongoClient;
var rp = require('request-promise');
const assert = require('assert');
const Player = require('./Player.js');
var keepPlayingBool = true;
let user = new Player();
console.log("***START***");
// Using this variable to hold player data to later be used to save player data
var playerDataHolder = [];

// Get the player data using a promise and set the value to the user object
user.getPlayerData().then(function(value) {
  // Get value from promise
  user.playerDataArray = value
  playerDataHolder = value;
  // Set player name
  user.playerName = user.playerDataArray.name;
  console.log("Set player name to " + user.playerName);
  // Set player money
  user.playerMoney = user.playerDataArray.money;
  console.log("Set player money to " + user.playerMoney);
  // Set player location
  user.playerLocation = [user.playerDataArray.lat, user.playerDataArray.long];
  console.log("Set player location to(lat,long): " + user.playerLocation);

  console.log("end");

}, function(err) {
  console.log("There was an error " + err);
});


console.log("This is on the last line but gets ran first while waiting for callback from mongo server.");
