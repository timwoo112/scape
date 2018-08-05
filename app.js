const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://twoolley:test@cluster0-jjfxc.mongodb.net/test?retryWrites=true';

// Database Name
const dbName = 'world_state';

// This function allows you to update the player's money.
// It takes an integer variable that is the new amount.
function addMoney(amount){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    //put commands under this line
    console.log("Connected successfully to server");

    var myquery = { name: "Tim" };
    var newvalues = {$set: {money: amount} };
    db.collection("player").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });

    client.close();
  });
}

// Function that reads the current amount of money player has.
function readMoney(){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    //put commands under this line
    console.log("Connected successfully to server");

      db.collection("player").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.money);
      client.close();
    });
  });
}
// Read location function. Returns and array of coordinates. 
function readLocation(){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    //put commands under this line
    console.log("Connected successfully to server");

      db.collection("player").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.location);
      client.close();
    });
  });
}
addMoney(1234);
readMoney();
readLocation();
