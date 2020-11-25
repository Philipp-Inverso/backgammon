function Stone(player) {
  var player = player
  var inBar = false;
  var inGame = true;
  var isHome = undefined;
  var pos = undefined;

  this.getPlayer = function() {return player}
  this.getPos = function() {return pos}
  this.getIsHome = function() {return isHome}
  this.getIsInGame = function() {return inGame}
  this.getIsInBar = function() {return inBar}

  this.setIsInGame = function(val) {inGame = val}
  this.setIsInBar = function(val) {inBar = val}

  this.setPos = function(spike) {
    pos = spike;
    if (spike.getNumber() < 7 && player == p0) {
      isHome = true;
    } else if (spike.getNumber() > 17 && player == p1) {
      isHome = true;
    } else {
      isHome = false;
    }
  }

  this.remove = function() {
    isHome = true
    inGame = false
    pos = undefined
  }
}

