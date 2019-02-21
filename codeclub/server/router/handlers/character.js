const MongoClient = require('mongodb').MongoClient;
var rp = require('request-promise');
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://twoolley:test@cluster0-jjfxc.mongodb.net/test?retryWrites=true';
// Database Name
const dbName = 'world_state';

class Player {

  constructor(playerName, playerMoney, playerLocation, playerX, playerY) {
    this.playerName = playerName;
    this.playerMoney = playerMoney;
    this.playerLocation = playerLocation;
    this.playerDataArray = [];
    this.playerX = playerX;
    this.playerY = playerY;
  }

  showName() {
    console.log(this.playerName);
  }
  showMoney() {
    console.log(this.playerMoney);
  }
  showLocation(){
    console.log(this.showLocation)
  }

  setPlayerX(amount){
    this.playerX += amount;
  }
  setPlayerY(amount){
    this.playerY += amount;
  }

  getPlayerData() {
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
            resolve(result);
            client.close();
            console.log("Closing connection from getPlayerData")
          }
        });
      });
    });
  }

  moveRightSave() {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true }, function(err, client, data) {
        assert.equal(null, err);
        const db = client.db(dbName);
        console.log("Connecting from getPlayerData");
        db.collection("player").findOneAndUpdate({"name": "Tim"}, { $inc : {"x": 10}});
        resolve (console.log("success"));
        client.close();
      });
    });
  }

  moveLeftSave() {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true }, function(err, client, data) {
        assert.equal(null, err);
        const db = client.db(dbName);
        console.log("Connecting from getPlayerData");
        db.collection("player").findOneAndUpdate({"name": "Tim"}, { $inc : {"x": -10}});
        resolve (console.log("success"));
        client.close();
      });
    });
  }
  moveDownSave() {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true }, function(err, client, data) {
        assert.equal(null, err);
        const db = client.db(dbName);
        console.log("Connecting from getPlayerData");
        db.collection("player").findOneAndUpdate({"name": "Tim"}, { $inc : {"y": 10}});
        resolve (console.log("success"));
        client.close();
      });
    });
  }
  moveUpSave() {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true }, function(err, client, data) {
        assert.equal(null, err);
        const db = client.db(dbName);
        console.log("Connecting from getPlayerData");
        db.collection("player").findOneAndUpdate({"name": "Tim"}, { $inc : {"y": -10}});
        resolve (console.log("success"));
        client.close();
      });
    });
  }
}

module.exports = Player;
