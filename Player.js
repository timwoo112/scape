const MongoClient = require('mongodb').MongoClient;
var rp = require('request-promise');
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://twoolley:test@cluster0-jjfxc.mongodb.net/test?retryWrites=true';
// Database Name
const dbName = 'world_state';

class Player {

  constructor(playerName, playerMoney, playerLocation) {
    this.playerName = playerName;
    this.playerMoney = playerMoney;
    this.playerLocation = playerLocation;
    this.playerDataArray = [];
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
}

module.exports = Player;
