function Person(name) {
  // members
  var name = name;
  var lastGame = undefined;
  this.stones = [];
  // methods
  this.getLastGame = function() {
    alert('the last game was: ' + this.lastGame);
  };
  this.getName = function() {return name}
  this.getStones = function() {return this.stones}
}

