//
//
//

const fs = require('fs');
const path = require('path');

//
// Router /////////////////////////////////////////////////////////////////////
//

const Router = function() {
  const self = this;
  self.handlers = {};
  const handlerPath = path.resolve(__dirname, 'handlers');
  fs.readdirSync(handlerPath).forEach(function(file) {
    if(!file.endsWith('.js')) return;
    const filePath = path.join(handlerPath, file);
    App.log.debug('Adding handler from', filePath);
    self.handlers = Object.assign(self.handlers, require(filePath));
  });
}

//
// public methods /////////////////////////////////////////////////////////////
//

Router.prototype.route = function(conn, msg) {
  App.log.info('received msg:',msg);
  handler = this.handlers[msg.id]
  if(handler !== undefined) {
    handler(conn, msg);
  }  
}

//
// exports ////////////////////////////////////////////////////////////////////
//

module.exports = Router;
