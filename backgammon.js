// global vars
var p0
var p1
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
  if (dices.length) {
    console.log("move not done")
    return
  }

  if (turn == p0.getName()) {
    turn = p1.getName()
  } else if (turn == p1.getName()) {
    turn = p0.getName()
  }
  let out = document.getElementById("turn")
  out.innerText = turn

  let dice0 = roll();
  let dice1 = roll();
  dices[0] = dice0
  dices[1] = dice1

  let output = document.getElementById("roll");
  output.innerText = dice0 + " | " + dice1
}

document.addEventListener("DOMContentLoaded", main);
