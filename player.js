function Person(name) {
  // members
  var name = name;
  var lastGame = undefined;
  var stonesInBar = 0
  this.stones = [];

  // methods
  this.getLastGame = function() {
    alert('the last game was: ' + this.lastGame);
  };
  this.getName = function() {return name}
  this.getStones = function() {return this.stones}
  this.getStonesInBar = function() {return stonesInBar}
  this.addStonesInBar = function(val=1) {stonesInBar += val}
  this.remStonesInBar = function(val=1) {stonesInBar -= val}
}

