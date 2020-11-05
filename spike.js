function Spike(number) {
  // members
  var number = number;
  if (number > 11) {
    var pos = 'up';
  } else {
    var pos = 'down'
  }
  var stones = []
  var containsStones = 0;

  // methods
  this.getNumber = function() {
    return number;
  }
  this.setNumber = function(val) {
    number = val;
  }
  this.getPos = function() {return pos}

  this.getStones = function() {
    return stones;
  }
  this.addStone = function(stone) {
    if (containsStones > 0){
      if (stone.getPlayer().getName() != stones[0].getPlayer().getName()) {
        return
      }
    }
    stones.push(stone);
    stone.setPos(this);
    containsStones += 1;
  }
  this.removeStone = function() {
    containsStones -= 1;
    return stones.pop();
  }
  this.getStoneCount = function() {
    return containsStones;
  }
}

