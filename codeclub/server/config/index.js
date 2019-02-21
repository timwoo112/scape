//
//
//

module.exports = {
  http: {
    port: 8181
  },
  ws: {
    originIsAllowed: function(origin) {
      return true;
    }
  }
}
