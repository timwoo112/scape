//
//
//

import {w3cwebsocket as WebSocket} from 'websocket';

export default class NetworkManager {

  //
  // members //////////////////////////////////////////////////////////////////
  //

  app = null;

  //
  // constructor //////////////////////////////////////////////////////////////
  //

  constructor(app) {
    this.app = app;
    this.client = null;
    this.isConnected = false;
  }

  //
  // public methods ///////////////////////////////////////////////////////////
  //

  start() {
    this.client = new WebSocket('ws://localhost:8181', 'client');
    this.client.onerror = this._onError.bind(this);
    this.client.onopen = this._onConnect.bind(this);
    this.client.onclose = this._onClose.bind(this);
    this.client.onmessage = this._onMessage.bind(this);
    this.client.testmessage = this._testMessage.bind(this);
  }

  //
  // --------------------------------------------------------------------------
  //

  _testMessage() {
    console.log('Test Message Successful!');
    this.ping();
  }

  //
  // --------------------------------------------------------------------------
  //

  send(msg) {
    if(this.isConnected) {
      const str = JSON.stringify(msg);
      console.log('sending message:',str);
      this.client.send(str);
    }
  }

  //
  // --------------------------------------------------------------------------
  //

  ping() {
    this.send({id: 'ping', time: new Date()});
  }

  //
  // --------------------------------------------------------------------------
  //

  update() {
  }

  //
  // --------------------------------------------------------------------------
  //

  playerPosition(msg) {
    console.log(msg.newPos);
    console.log("inside player position handler");
    this.app.playerPosition = msg.newPos;
  }

  //
  // --------------------------------------------------------------------------
  //

  initialPosition(msg) {
    console.log("inside initial position handler");
    console.log(msg.initialPos);
    this.app.playerPosition = msg.initialPos;
  }

  //
  // private methods ----------------------------------------------------------
  //

  _route(msg) {
    console.log(msg);
    const callback = this[msg.id];
    if(callback) {
      callback.bind(this)(msg);
    } else {
      console.error('no handler for ', msg);
    }
  }

  //
  // --------------------------------------------------------------------------
  //

  _onError(err) {
    console.error(err);
  }

  //
  // --------------------------------------------------------------------------
  //

  _onConnect() {
    console.log('Connection Established');
    this.isConnected = true;
    this.ping();
  }

  //
  // --------------------------------------------------------------------------
  //

  _onMessage(msg) {
    msg = JSON.parse(msg.data);
    this._route(msg);
  }

  //
  // --------------------------------------------------------------------------
  //

  _onClose() {
    console.log('Connection closed');
    this.isConnected = false;
  }

  //
  // end class ////////////////////////////////////////////////////////////////
  //
}
