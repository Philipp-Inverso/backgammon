function Spike(number) {
  var number = number;
  var cell = undefined;
  if (number > 11) {
    var pos = 'up';
  } else {
    var pos = 'down'
  }

  var stones = []
  var stoneCount = 0;
  var selected = false;
  var selectable = false;

  this.getNumber = function() {
    return number;
  }
  this.setNumber = function(val) {
    number = val;
  }

  this.getPos = function() {
    return pos
  }

  this.getSelected = function() {
    return selected;
  }
  this.setSelected = function(val=true) {
    selected = val;
  }

  this.getStones = function() {
    return stones;
  }
  this.addStone = function(stone) {
    if (stoneCount > 0){
      if (stone.getPlayer() != stones[0].getPlayer()) {
        console.log('TODO: error') // should not reach this
        return
      }
    }
    stones.push(stone);
    stone.setPos(this);
    stoneCount += 1;
  }
  this.removeStone = function() {
    if (stoneCount) {
      stoneCount -= 1;
      return stones.pop();
    }
    console.log("TODO: error") // should not reach this
  }
  this.getStoneCount = function() {
    return stoneCount;
  }

  this.getSelectable = function() {
    return selectable;
  }
  this.setSelectable = function(val=true) {
    selectable = val;
  }

  this.setCell = function(val) {
    cell = val
  }
  this.getCell = function() {
    return cell
  }
}

