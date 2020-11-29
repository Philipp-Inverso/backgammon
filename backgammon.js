// global lets
let p0
let p1
let emptyBar = false
let somethingSelected = false
let selectedSpike = undefined
const winEnum = {
  LOSE: 0,
  WIN: 1,
  GAMMON: 2,
  BACKGAMMON: 3
}
const spikes = []
let dices = []
turn = undefined

//methods
function main() {
  for (let i = 0; i < 24; i++) {
    spikes.push(new Spike(i))
  }

  p0 = new Person('weiss')
  p1 = new Person('schwarz')

  initStones(p0, p1)

  init()

  let throww
  while (turn == undefined) {
    throww = rollTurn()
    // initialize turn with opponent because turn gets twisten when dice is rolled
    if (throww[0] > throww[1]) {
      turn = p1
      alert(p0.getName() + " beginnt")
    } else if (throww[1] > throww[0]) {
      turn = p0
      alert(p1.getName() + " beginnt")
    }
  }
}

function rollTurn() {
  let d0 = roll()
  alert(p0.getName() + " würfelt: " + d0)
  let d1 = roll()
  alert(p1.getName() + " würfelt: " + d1)
  return [d0, d1]
}

// populate board with initial stone positions
function initStones(p0, p1) {
  for (let i = 0; i < 15; i++) {p0.stones.push(new Stone(p0, i))}
  for (let i = 0; i < 15; i++) {p1.stones.push(new Stone(p1, i))}

  for (let i=0; i<5; i++) {
    spikes[17].addStone(p0.stones[i])
    spikes[5].addStone(p1.stones[i])
  }
  for (let i=5; i<8; i++) {
    spikes[19].addStone(p0.stones[i])
    spikes[7].addStone(p1.stones[i])
  }
  for (let i=8; i<13; i++) {
    spikes[11].addStone(p0.stones[i])
    spikes[23].addStone(p1.stones[i])
  }
  for (let i=13; i<15; i++) {
    spikes[0].addStone(p0.stones[i])
    spikes[12].addStone(p1.stones[i])
  }
}

function roll() {
  return Math.ceil(Math.random()*6)
}

function throwDices() {
  let dice0 = roll()
  let dice1 = roll()
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
      let output = document.getElementById("roll")
      output.innerText = "move not done"
      return
    } else {
      let output = document.getElementById("roll")
      output.innerText = "skip turn"
      if (somethingSelected) {
        setSpikeSelected(false, selectedSpike)
      }
      unhighlightSpikes()
      emptyBar = false
      dices = []
    }
  }
  throwDices()
  // next player
  if (turn == p0) {
    turn = p1
  } else if (turn == p1) {
    turn = p0
  }
  if (turn.getStonesInBar()) {
    handleStonesInBar(p1)
  }
  updateHTML()
}

function handleStonesInBar() {
  for (target of spikes) {
    if (turn == p0) {
      if (target.getNumber() < 18) {
        continue
      }
    } else {
      if (target.getNumber() > 5) {
        continue
      }
    }
    if (isSpikeFullOrOpponent(target)) {
      continue
    }
    if (turn == p0) {
      if (24-target.getNumber() != dices[0] && 24-target.getNumber() != dices[1]){
        continue
      }
    } else {
      if (target.getNumber()+1 != dices[0] && target.getNumber()+1 != dices[1]){
        continue
      }
    }
    highlightSpike(target)
  }
  emptyBar = true
}

function updateHTML() {
  let out = document.getElementById("turn")
  out.innerText = "An der Reihe: " + turn.getName()

  out = document.getElementById("board")
  out.innerText = "Steine im Board: " + turn.getStonesInBar()

  out = document.getElementById("roll")
  out.innerText = ""
  for (dice of dices) {
    out.innerText += dice + " |"
    out.innerText += " "
  }
}

document.addEventListener("DOMContentLoaded", main)
