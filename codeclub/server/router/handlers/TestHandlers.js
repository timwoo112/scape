//
//
//
const MongoClient = require('mongodb').MongoClient;
var rp = require('request-promise');
const assert = require('assert');
const Player = require('./character.js');
var keepPlayingBool = true;
let user = new Player();
var playerCoordinates = [];
var message;

module.exports = {
  echo: function(conn, msg) {
    console.log(msg);
    if (conn != undefined) {
      conn.sendJson(msg);
    }
  },

  ping: function(conn, msg) {
    console.log(msg);
    // Sets the initial player position on page load
    this.msg = msg;
    user.getPlayerData().then(function(value) {
      user.playerDataArray = value;
      App.playerPosition.x = user.playerDataArray.x;
      App.playerPosition.y = user.playerDataArray.y;
      console.log("------(Initial-X-coord)------" + user.playerDataArray.x);
      console.log("------(Initial-Y-coord)------" + user.playerDataArray.y);
    }, function(err) {
      // throw error if there is one.
      console.log("There was an error " + err);
    }).then(function() {
      conn.sendJson({id: "playerPosition", newPos: App.playerPosition});
    });
  },

  move: function(conn, msg) {
    this.message = msg

    // Get the player data using a promise and set the value to the user object
    user.getPlayerData().then(function(value) {
      user.playerDataArray = value
      App.playerPosition.x = user.playerDataArray.x;
      App.playerPosition.y = user.playerDataArray.y;
      console.log("***************" + user.playerDataArray.x);
      console.log("---------------" + user.playerDataArray.y);
    }, function(err) {
      // throw error if there is one.
      console.log("There was an error " + err);
    }).then(function() {
      if (msg.msg == "moved right") {
        console.log("moving right:" + App.playerPosition.x);
        App.playerPosition.x += 10;
        console.log("Increased x:" + App.playerPosition.x);
        user.setPlayerX(App.playerPosition.x);
        conn.sendJson({id: "playerPosition", newPos: App.playerPosition});
        user.moveRightSave();
      } else if (msg.msg == "moved left") {
        console.log("moving right:" + App.playerPosition.x);
        App.playerPosition.x -= 10;
        console.log("Decreased x:" + App.playerPosition.x);
        user.setPlayerX(App.playerPosition.x);
        conn.sendJson({id: "playerPosition", newPos: App.playerPosition});
        user.moveLeftSave();
      } else if (msg.msg == "moved down") {
        console.log("moving down:" + App.playerPosition.y);
        App.playerPosition.y += 10;
        console.log("Increased y:" + App.playerPosition.y);
        user.setPlayerY(App.playerPosition.y);
        conn.sendJson({id: "playerPosition", newPos: App.playerPosition});
        user.moveDownSave();
      } else if (msg.msg == "moved up") {
        console.log("moving up:" + App.playerPosition.y);
        App.playerPosition.y -= 10;
        console.log("Decreased y:" + App.playerPosition.y);
        user.setPlayerX(App.playerPosition.y);
        conn.sendJson({id: "playerPosition", newPos: App.playerPosition});
        user.moveUpSave();
      }
    });
  }

  // At app start up put the player in their correct position
  // Why didn't this work??
  /*
  initialPos: function(conn, msg) {
    this.msg = msg;
    user.getPlayerData().then(function(value) {
      user.playerDataArray = value
      App.playerPosition.x = user.playerDataArray.x;
      App.playerPosition.y = user.playerDataArray.y;
      console.log("------(Initial-X-coord)------" + user.playerDataArray.x);
      console.log("------(Initial-Y-coord)------" + user.playerDataArray.y);
    }, function(err) {
      // throw error if there is one.
      console.log("There was an error " + err);
    }).then(function() {
      conn.sendJson({id: "playerPosition", initialPos: App.playerPosition});
    });
  }
  */
}
