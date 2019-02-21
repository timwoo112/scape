//
//
//

export default class InputManager {

  //
  // members ////////////////////////////////////////////////////////
  //

  app = null;

  //
  // constructor ////////////////////////////////////////////////////
  //

  constructor(app) {
    this.app = app;
  }

  //
  // public methods /////////////////////////////////////////////////
  //

  start() {
    /*
    // Set initial position from the server
    document.addEventListener("DOMContentLoaded", (event) => {
      console.log(this.app.playerPosition);
      this.app.networkManager.send({id: "initialPos", msg: "initial position"});
    }),
    */
    // Control movement
    document.addEventListener('keyup', (ev) => {
      if (ev.key == 'd') {
        this.app.networkManager.send({id: "move", msg: "moved right"});
      } else if (ev.key == 'a') {
        this.app.networkManager.send({id: "move", msg: "moved left"});
      } else if (ev.key == 's') {
        this.app.networkManager.send({id: "move", msg: "moved down"});
      } else if (ev.key == 'w') {
        this.app.networkManager.send({id: "move", msg: "moved up"});
      }
    })
  }

  //
  // --------------------------------------------------------------------------
  //

  update() {

  }

  //
  // end class //////////////////////////////////////////////////////
  //
}
