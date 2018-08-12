// Tim Woolley 2018
// This file provides interaction to the mongodb server

const MongoClient = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://twoolley:test@cluster0-jjfxc.mongodb.net/test?retryWrites=true';
// Database Name
const dbName = 'world_state';

// Start server with player's name
function playerConnect(nameOfPlayer) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    /* Variables */
    const playerName = nameOfPlayer;
    const db = client.db(dbName);
    var playerLat = 0;
    var playerLong = 0;
    var myquery = { name: playerName };

    // Player Object
    function playerObject(name, money, playerLatitude, playerLongitude) {
      this.name = name;
      this.money = money;
      this.playerLatitude = playerLatitude;
      this.playerLongitude = playerLongitude;

      this.sayName = function() {
        console.log(`I am ` + name)
      }
    }


    /* GET FUNCTIONS */
    function getMoney() {
      var amount = 0;
      //put commands under this line
      db.collection("player").findOne(myquery, function(err, result) {
        if (err)
          throw err;
        amount = result.money;
        console.log("The amount is " + amount);
      });
      return amount;
    }
    function getLatitude() {
      db.collection("player").findOne(myquery, function(err, result) {
        if (err)
          throw err;
        return result.lat;
      });
    }
    function getLongitude() {
      db.collection("player").findOne(myquery, function(err, result) {
        if (err)
          throw err;
        return result.long;
      });
    }

    /* PUT FUNCTIONS */
    function changeLocation(lat, long) {
      var latitude = {
        $set: {
          lat: lat
        }
      };
      var longitude = {
        $set: {
          long: long
        }
      };
      db.collection("player").updateOne(myquery, latitude, function(err, res) {
        if (err)
          throw err;
        console.log("Changed the latitude successfully");
      });
      db.collection("player").updateOne(myquery, longitude, function(err, res) {
        if (err)
          throw err;
        console.log("Changed the longitude successfully");
      });
    }
    function addMoney(amount) {
      //put commands under this line
      var myquery = {
        name: playerName
      };
      var newvalues = {
        $set: {
          money: amount
        }
      };
      db.collection("player").updateOne(myquery, newvalues, function(err, res) {
        if (err)
          throw err;
        console.log("1 document updated");
      });
    }

    //Start player instance
    var playerInstance = new playerObject(playerName);


    playerInstance.sayName();
    playerInstance.money = getMoney();
    playerInstance.playerLatitude = getLatitude();
    playerInstance.playerLongitude = getLongitude();

    console.log(playerInstance.name);
    console.log(playerInstance.money);
    console.log(playerInstance.playerLatitude);
    console.log(playerInstance.playerLongitude);
    // Close the connection
    console.log("Closing Connection");
    client.close();
  });
}
playerConnect("Char");
// This is where I call all of the functions just to test them
/*
  addMoney(-23);
  readMoney();
  readLocation();
  changeLocation(123,456);
  */
