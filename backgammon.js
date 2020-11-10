// global vars
var somethingSelected = false;
var selectedSpike = undefined;
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

function populateHead(head, content, pos) {
  for (spike of content) {
    if (spike.getPos() == pos) {continue}
    row = document.createElement('th');
    text = document.createTextNode('S' + spike.getNumber());
    // row.onclick = function() {
    //   console.log(row.textContent);
    // }

    row.appendChild(text);
    head.appendChild(row);
  }
}

function populateBody(body, content, pos) {
  tableBody = body;
  playerRow = document.createElement('tr');
  numberRow = document.createElement('tr');
  // number of stones
  for (spike of content) {
    if (spike.getPos() == pos) {continue}
    cell = document.createElement('td');
    text = document.createTextNode(spike.getStoneCount());

    cell.appendChild(text);
    numberRow.appendChild(cell);
  }
  // player
  for (spike of content) {
    if (spike.getPos() == pos) {continue}
    cell = document.createElement('td');
    if (spike.getStoneCount() > 0) {
      text = document.createTextNode(spike.getStones()[0].getPlayer().getName())
    } else {
      text = document.createTextNode('-')
    }
    cell.appendChild(text);
    playerRow.appendChild(cell);
  }
  if (pos == 'up') {
    tableBody.appendChild(playerRow);
    tableBody.appendChild(numberRow);
  } else {
    tableBody.appendChild(numberRow);
    tableBody.appendChild(playerRow);
  }
}

function populateTable() {
  let revSpikes = [].concat(spikes)
  revSpikes.reverse()

  // upper-head
  tableHead = document.getElementsByTagName('thead').item(0);
  populateHead(tableHead, revSpikes, 'down')
  // lower-head
  tableHead = document.getElementsByTagName('thead').item(1);
  populateHead(tableHead, spikes, 'up')

  // lower-body
  tableBody = document.getElementsByTagName('tbody').item(1);
  populateBody(tableBody, spikes, 'up')
  //upper-body
  tableBody = document.getElementsByTagName('tbody').item(0);
  populateBody(tableBody, revSpikes, 'down')

  // separating line
  empty = document.createElement('tr');
  for(let i=0; i<12; i++) {
    cell = document.createElement('td');
    text = document.createTextNode('.')
    cell.appendChild(text);
    empty.appendChild(cell);
  }
  tableBody.appendChild(empty);

  table = document.getElementsByTagName('thead');
  for (thead of table) {
    for (th of thead.children) {
      //console.log(th);
      //th.classList.add('button');
      th.onclick = (click) => {
        cell = click.target;
        spike = spikes[cell.textContent.slice(1)];
        if (somethingSelected) {
          if (spike.getSelected()){
            //console.log(cell.textContent)
            spike.setSelected(false);
            somethingSelected = false;
            cell.style.background='white'
          } else if (selectedSpike.getNumber() > spike.getNumber()){
            console.log(selectedSpike.getNumber())
            console.log(spike.getNumber())
            console.log(selectedSpike.getNumber() +' > '+ spike.getNumber())
            console.log('wrong direction')
          }
          console.log('foo')
        } else {
          //console.log(cell.textContent)
          if (spike.getStoneCount()) {
            spike.setSelected();
            somethingSelected = true;
            selectedSpike = spike;
            cell.style.background='gray'
          } else {
            console.log('no stones')
          }
        }
      };
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

main()
