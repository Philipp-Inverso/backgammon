// global vars
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

// utility functions
function roll() {
  console.log(Math.ceil(Math.random()*6))
}

function include(file) {
  var script  = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);
}

function spikeMovable(origin, target) {
  // prep
  originPlayer = origin.getStones()[0].getPlayer().getName()
  if (target.getStoneCount()) {
    targetPlayer = target.getStones()[0].getPlayer().getName()
  } else {
    targetPlayer = 'none'
  }

  // spikeMovable
  if (target.getStoneCount() >= 5 || (target.getStoneCount() > 0 && originPlayer != targetPlayer)) {
    return false
  }

  if (originPlayer == 'weiss' && origin.getNumber() < target.getNumber()) {
    return false
  } else if (originPlayer == 'schwarz' && origin.getNumber() > target.getNumber()) {
    return false
  }
  return true

  //return ((originPlayer == 'weiss' && origin.getNumber() < target.getNumber()) ||
  //  (originPlayer == 'schwarz' && origin.getNumber() > target.getNumber())) &&
  //  (target.getStoneCount() == 0 || originPlayer == targetPlayer)
}

function setSelected(val=true, spike, cell) {
  if (val) {
    somethingSelected = true
    selectedSpike = spike
    selectedCell = cell
    spike.setSelected()
    cell.style.background='gray'
  } else {
    somethingSelected = false
    selectedSpike = undefined
    selectedCell = undefined
    spike.setSelected(false)
    cell.style.background='white'
  }
}

function stoneFoo(clicked) {
  cell = clicked.target;
  spike = spikes[cell.textContent.slice(1)];
  if (somethingSelected) {
    // clicked same spike
    if (spike.getSelected()){
      setSelected(false, selectedSpike, selectedCell)
      setSelected(false, spike, cell)
    // check for possible movement && execute
    } else if (spikeMovable(selectedSpike, spike)){
      spike.addStone(selectedSpike.removeStone())
      populateTable()
      setSelected(false, selectedSpike, selectedCell)
      setSelected(false, spike, cell)
    } else {
    // TODO: errors
      console.log('wrong direction')
    }
  } else {
    if (spike.getStoneCount()) {
      setSelected(true, spike, cell)
    } else {
      console.log('no stones')
    }
  }
}

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

function main() {
  var p0 = new Person('weiss')
  var p1 = new Person('schwarz')

  initStones(p0, p1)

  populateTable();
}

function init() {
  main()
}

document.addEventListener("DOMContentLoaded", init);
