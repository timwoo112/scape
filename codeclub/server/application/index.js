//
//
//

const bunyan = require('bunyan')
const config = require('../config');
const http = require('http');
const pkg = require('../package.json');
const Promise = require('bluebird');
const Router = require('../router');
const WebSocketServer = require('websocket').server;

//
// constructor ////////////////////////////////////////////////////////////////
//

const Application = function() {
  this.log = bunyan.createLogger({name: 'server'});
  this.config = config;
  this.pkg = pkg;
  this.httpServer = null;
  this.wsServer = null;
  this.router = null;
  this.playerPosition = { x: 0, y: 0 };
}

//
// public methods /////////////////////////////////////////////////////////////
//

Application.prototype.start = function() {
  // Exercise: Promisify this start method!
  this._setupRouter();
  this._setupHttpServer();
  this._setupWebSocketServer();
}

//
// private methods ////////////////////////////////////////////////////////////
//

Application.prototype._setupHttpServer = function() {
  this.httpServer = http.createServer(function(req,res) {
    res.writeHead(404);
    res.end();
  });

  this.httpServer.listen(this.config.http.port);
  this.log.info("Started server on port", this.config.http.port)
}

//
// ----------------------------------------------------------------------------
//

Application.prototype._setupWebSocketServer = function() {
  let self = this;

  this.wsServer = new WebSocketServer({
    httpServer: self.httpServer,
    autoAcceptConnections: false,
  });

  this.wsServer.on('request', function(req) {


    if(!self.config.ws.originIsAllowed(req.origin)) {
      req.reject();
      self.log.warn('Rejected a request from', req.origin);
    }

    const conn = req.accept('client', req.origin);
    self.log.info('Accepted a client from', req.origin);

    conn.sendJson = function(obj) {
      conn.sendUTF(JSON.stringify(obj));
    }

    conn.on('message', function(msg) {
      msg = JSON.parse(msg.utf8Data);
      self.router.route(conn, msg);
    });

    conn.on('close', function(reason, desc) {
      self.log.info('Closed connection from', req.origin);
    });
  });
}

//
// ----------------------------------------------------------------------------
//

Application.prototype._setupRouter = function() {
  this.router = new Router(this);
}

//
// exports ////////////////////////////////////////////////////////////////////
//

module.exports = Application;
