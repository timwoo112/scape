class Player {

  constructor(playerName, playerMoney, playerLocation) {
    this.playerName = playerName;
    this.playerMoney = playerMoney;
    this.playerLocation = playerLocation;
  }

  showName() {
    console.log(this.playerName);
  }
  showMoney() {
    console.log(this.playerMoney);
  }
  showLocation(){
    console.log(this.showLocation)
  }
}

module.exports = Player;
