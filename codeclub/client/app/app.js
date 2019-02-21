//
//
//

import InputManager from './input/InputManager';
import NetworkManager from './network/NetworkManager';
import RenderManager from './render/RenderManager';
import Config from './config';

export default class Application
{
  //
  // members //////////////////////////////////////////////////////////////////
  //

  config = Config;
  inputManager = null;
  networkManager = null;
  renderManager = null;
  ticker = null;
  playerPosition = { x: 0, y: 0 };
  mapBounds = {x: 0, y: 0};

  //
  // constructor //////////////////////////////////////////////////////////////
  //

  constructor(mapBounds) {
    const appElement = document.getElementById('app');
    this.inputManager = new InputManager(this);
    this.renderManager = new RenderManager(this, appElement);
    this.networkManager = new NetworkManager(this);
  }

  //
  // public methods ///////////////////////////////////////////////////////////
  //

  start() {
    this.networkManager.start();
    this.renderManager.start();
    this.inputManager.start();

    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(this._update, this, PIXI.UPDATE_PRIORITY.NORMAL)
    this.ticker.start();
  }

  //
  // private methods //////////////////////////////////////////////////////////
  //

  _update(dt) {
    this.inputManager.update();
    this.networkManager.update();
    this.renderManager.update();
  }

  //
  // end class ////////////////////////////////////////////////////////////////
  //
}
