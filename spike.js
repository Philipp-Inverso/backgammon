function Spike(inNumber) {
  var number
  if (inNumber < 12) {
    number = 23-inNumber
  } else {
    number = inNumber-12
  }
  if (number > 11) {
    var pos = 'up';
  } else {
    var pos = 'down'
  }

  let game = document.getElementById("spielbrett")
  let div = document.createElement("div")
  div.classList.add("dreieck")
  div.onclick = (clicked) => {moveStone(clicked)};
  div.id = number
  if (number > 11) {
    div.classList.add("top")
    if (game.childElementCount == 1) {
      div.classList.add("left")
    }
  } else {
    div.classList.add("bottom")
  }
  if (game.childElementCount == 7 || game.childElementCount == 19) {
    div.classList.add("right")
  }
  if (inNumber % 2 == 0) {
    div.classList.add("ungerade")
  }
  game.appendChild(div)

  var stones = []
  var stoneCount = 0;
  var selected = false;
  var selectable = false;

  this.getDiv = function() {return div}
  this.getNumber = function() {
    return number;
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
}

