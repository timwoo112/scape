//
//
//

export default class InputManager {

  //
  // members //////////////////////////////////////////////////////
  //

  app = null;

  //
  // constructor //////////////////////////////////////////////////
  //

  constructor(app) {
    this.app = app;
  }

  //
  // public methods ///////////////////////////////////////////////
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
        if (this.app.playerPosition.x < this.app.mapBounds.x - 20) {
          this.app.networkManager.send({id: "move", msg: "moved right"});
        } else{
          console.log("This is out of bounds");
        }
      } else if (ev.key == 'a') {
        if(this.app.playerPosition.x > 20){
          this.app.networkManager.send({id: "move", msg: "moved left"});
        }else{
          console.log("This is out of bounds");
        }
      } else if (ev.key == 's') {
        if (this.app.playerPosition.y < this.app.mapBounds.y - 20){
          this.app.networkManager.send({id: "move", msg: "moved down"});
        }else{
          console.log("This is out of bounds");
        }
      } else if (ev.key == 'w') {
        if (this.app.playerPosition.y > 20){
          this.app.networkManager.send({id: "move", msg: "moved up"});
        } else{
          console.log("This is out of bounds");
        }
      }
    })
  }

  //
  // --------------------------------------------------------------------------
  //

  update() {}

  //
  // end class ////////////////////////////////////////////////////
  //
}
