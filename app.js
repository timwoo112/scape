const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://twoolley:test@cluster0-jjfxc.mongodb.net/test?retryWrites=true';

// Database Name
const dbName = 'world_state';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  const db = client.db(dbName);
  //put commands under this line
  console.log("Connected successfully to server");

  var myquery = { name: "Tim" };
  var newvalues = {$set: {money: "5000"} };
  db.collection("player").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

  client.close();
});
