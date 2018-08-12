var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var player = require('./player.model');
var port = 8080;
var db = 'mongodb+srv://twoolley:test@cluster0-jjfxc.mongodb.net/world_state'

mongoose.connect(db);

app.get('/', function(req, res) {
  res.send('testing');
});

app.get('/', function(req, res) {
  console.log('getting all players');
  player.find({name: "Tim"}).exec(function (err, result){
    if(err){
      res.send('error');
    }else{
      console.log(result);
      res.json(result);
    }
  });
});

app.listen(port, function() {
  console.log('app listening on port' + port);
});
