function Stone(player) {
  var player = player
  var inBar = false;
  var inBand = false;
  var inGame=false;
  var isHome = undefined;
  var pos = undefined;

  this.getPlayer = function() {return player}
  this.getPos = function() {return pos}
  this.getIsHome = function() {return isHome}
  this.getIsInBand = function() {return inBand}
  this.getIsInGame = function() {return inGame}
  this.getIsInBar = function() {return inBar}

  this.setIsInBand = function(val) {inBand = val}
  this.setIsInGame = function(val) {inGame = val}
  this.setIsInBar = function(val) {inBar = val}

  this.setPos = function(spike) {
    // todo last pos (move away)
    pos = spike;
    if (spike.getNumber() < 7 && player.name == 'weiss') {
      isHome = true;
    } else if (spike.getNumber() > 18 && player.name == 'schwarz') {
      isHome = true;
    } else {
      isHome = false;
    }

    if (pos.getStoneCount() > 0) {
      for (stone of pos.getStones()) {
        stone.setIsInBand(true);
      }
    }
  }
}

