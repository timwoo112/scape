//
//
//

import * as PIXI from 'pixi.js';

export default class RenderManager {

  //
  // members //////////////////////////////////////////////////////////////////
  //

  app = null;
  root = null;
  pixi = null;
  layers = {};

  //
  // constructor //////////////////////////////////////////////////////////////
  //

  constructor(app, root) {
    this.app = app;
    this.root = root;
    this.rectangle = null;
  }

  //
  // public methods ///////////////////////////////////////////////////////////
  //

  start() {
    const bounds = this._getBounds();
    console.log("The bounds are: " + bounds.width + " " + bounds.height);
    // setting bounds in the app so that I can use them for simulation
    this.app.mapBounds.x = bounds.width;
    this.app.mapBounds.y = bounds.height;

    const config = {...this.app.config.pixi.init, width: bounds.width, height: bounds.height};
    this.pixi = new PIXI.Application(config);

    console.log(bounds);

    // Tim test Rectangle
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xfffb96);
    // set the line style to have a width of 5 and set the color to red
    graphics.lineStyle(5, 0x05ffa1);
    // draw a rectangle
    graphics.drawRect(0, 0, 50, 50);
    this.rectangle = graphics;

    // build layers
    const self = this;
    let lastContainer = this.pixi.stage;
    this.app.config.pixi.layers.forEach((name,index)=>{
      const newLayer = new PIXI.Container();
      lastContainer.addChild(newLayer)
      lastContainer.addChild(graphics);
      lastContainer = newLayer;
      this.layers[name] = newLayer;
    });

    // add our view into the DOM
    this.root.appendChild(this.pixi.view);

    // get a callback whenever the window resizes
    window.addEventListener('resize', this._onWindowResize.bind(this));
    this._onWindowResize();
  }

  //
  // --------------------------------------------------------------------------
  //

  update() {
    if(this.app) {
      console.log(this.app);
      this.rectangle.position.x = this.app.playerPosition.x;
      this.rectangle.position.y = this.app.playerPosition.y;
    }
  }

  //
  // private methods //////////////////////////////////////////////////////////
  //

  _getBounds() {
    const rect = this.root.getBoundingClientRect();
    return new PIXI.Rectangle(rect.left, rect.top, rect.width, rect.height);
  }

  //
  // --------------------------------------------------------------------------
  //

  _onWindowResize() {
    const bounds = this._getBounds();
    this.pixi.renderer.resize(bounds.width, bounds.height);
  }

  //
  // end class ////////////////////////////////////////////////////////////////
  //
}
