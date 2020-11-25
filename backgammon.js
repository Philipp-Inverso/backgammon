// global vars
var p0
var p1
var emptyBar = false
var somethingSelected = false;
var selectedSpike = undefined;
var selectedCell = undefined;
const winEnum = {
  LOSE: 0,
  WIN: 1,
  GAMMON: 2,
  BACKGAMMON: 3
}
const spikes = [];
for (let i = 0; i < 24; i++) {
  spikes.push(new Spike(i));
}
var dices = [] //tuple
turn = "None"

//methods
function main() {
  p0 = new Person('weiss')
  p1 = new Person('schwarz')

  initStones(p0, p1)

  populateTable();

  while (turn == "None") {
    rollTurn()
    // initialize turn with opponent because turn gets twisten when dice is rolled
    if (d0 > d1) {
      turn = p1.getName()
      alert(p0.getName() + " beginnt")
    } else if (d1 > d0) {
      turn = p0.getName()
      alert(p1.getName() + " beginnt")
    }
  }
}

function rollTurn() {
  d0 = roll()
  alert(p0.getName() + " würfelt: " + d0)
  d1 = roll()
  alert(p1.getName() + " würfelt: " + d1)
}

// populate board with initial stone positions
function initStones(p0, p1) {
  for (let i = 0; i < 15; i++) {p0.stones.push(new Stone(p0));}
  for (let i = 0; i < 15; i++) {p1.stones.push(new Stone(p1));}

  for (let i=0; i<5; i++) {
    spikes[5].addStone(p0.stones[i]);
    spikes[18].addStone(p1.stones[i]);
  }
  for (let i=5; i<8; i++) {
    spikes[7].addStone(p0.stones[i]);
    spikes[16].addStone(p1.stones[i]);
  }
  for (let i=8; i<13; i++) {
    spikes[12].addStone(p0.stones[i]);
    spikes[11].addStone(p1.stones[i]);
  }
  for (let i=13; i<15; i++) {
    spikes[23].addStone(p0.stones[i]);
    spikes[0].addStone(p1.stones[i]);
  }
}

function roll() {
  return Math.ceil(Math.random()*6);
}

function throwDices() {
  let dice0 = roll();
  let dice1 = roll();
  dices.push(dice0)
  dices.push(dice1)
  if (dice0 == dice1) {
    dices.push(dice0)
    dices.push(dice1)
  }
}

function prepareTurn() { /// ON_CLICK for dice button
  if (dices.length) {
    if (!skipTurn()) {
      console.log("move not done")
      return
    } else {
      console.log("skip turn")
      if (somethingSelected) {
        setSpikeSelected(false, selectedSpike, selectedCell)
      }
      emptyBar = false
      dices = []
    }
  }
  throwDices()
  // twist turn + check for stones in bar
  if (turn == p0.getName()) {
    turn = p1.getName()
    if (p1.getStonesInBar()) {
      handleStonesInBar(p1)
    }
  } else if (turn == p1.getName()) {
    turn = p0.getName()
    if (p0.getStonesInBar()) {
      handleStonesInBar(p0)
    }
  }
  updateHTML()
}

function handleStonesInBar(player) {
  // init
  let localSpikes
  let pos
  if (player.getName() == p0.getName()) {
    localSpikes = [].concat(spikes)
    localSpikes.reverse()
    pos = 0
  } else {
    localSpikes = spikes
    pos = 1
  }
  // do
  for (target of localSpikes) {
    // sort out non-home spikes
    if (pos == 0) {
      if (target.getNumber() < 18) {
        continue
      }
    } else {
      if (target.getNumber() > 5) {
        continue
      }
    }
    if (isSpikeFullOrOpponent(player.getName(), target)) {
      continue
    }
    if (turn == p0.getName()) {
      if (24-target.getNumber() != dices[0] && 24-target.getNumber() != dices[1]){
        continue
      }
    } else {
      if (target.getNumber()+1 != dices[0] && target.getNumber()+1 != dices[1]){
        continue
      }
    }
    highlightSpike(target);
  }
  emptyBar = true
}

function updateHTML() {
  let player
  if (turn == p0.getName()){
    player = p0
  } else {
    player = p1
  }
  let out = document.getElementById("turn")
  out.innerText = turn + " | " + player.getStonesInBar()

  let output = document.getElementById("roll");
  output.innerText = ""
  for (dice of dices) {
    output.innerText += dice + " |"
    output.innerText += " "
  }
}

document.addEventListener("DOMContentLoaded", main);
