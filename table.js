/// creates table-heads
/// @param head = thead html-element
/// @param content = list of spikes
/// @param pos = position to exclude ('up'/'down')
function populateHead(head, content, pos) {
  let row
  let text
  for (spike of content) {
    if (spike.getPos() == pos) {continue}
    row = document.createElement('th');
    row.classList.toggle("unselected")
    text = document.createTextNode('S' + spike.getNumber());
    spike.setCell(row)

    row.appendChild(text);
    head.appendChild(row);
  }
}

/// creates table-bodys
/// @param body = tbody html-element
/// @param content = list of spikes
/// @param pos = position to exclude ('up'/'down')
function populateBody(body, content, pos) {
  let tableBody = body;
  let playerRow = document.createElement('tr');
  let numberRow = document.createElement('tr');
  let cell
  let text
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
    if (spike.getPos() == pos) {continue} // exclude spikes in pos

    cell = document.createElement('td');
    if (spike.getStoneCount() > 0) {
      text = document.createTextNode(spike.getStones()[0].getPlayer().getName())
    } else {
      text = document.createTextNode('-')
    }
    cell.appendChild(text);
    playerRow.appendChild(cell);
  }
  // append rows in appropriate order (top->bottom)
  if (pos == 'up') {
    tableBody.appendChild(playerRow);
    tableBody.appendChild(numberRow);
  } else {
    tableBody.appendChild(numberRow);
    tableBody.appendChild(playerRow);
  }
}

function clearTable() {
  let heads = document.getElementsByTagName('thead');
  for (head of heads) {
    while (head.firstChild) {
      head.removeChild(head.firstChild)
    }
  }
  let bodys = document.getElementsByTagName('tbody');
  for (body of bodys) {
    while (body.firstChild) {
      body.removeChild(body.firstChild)
    }
  }
}

function populateTable() {
  clearTable()
  let revSpikes = [].concat(spikes)
  revSpikes.reverse()

  // upper-head
  let tableHead = document.getElementsByTagName('thead').item(0);
  populateHead(tableHead, revSpikes, 'down')
  // lower-head
  tableHead = document.getElementsByTagName('thead').item(1);
  populateHead(tableHead, spikes, 'up')

  // lower-body
  let tableBody = document.getElementsByTagName('tbody').item(1);
  populateBody(tableBody, spikes, 'up')
  //upper-body
  tableBody = document.getElementsByTagName('tbody').item(0);
  populateBody(tableBody, revSpikes, 'down')

  // separating line
  let empty = document.createElement('tr');
  let cell
  let text
  for(let i=0; i<12; i++) {
    cell = document.createElement('td');
    text = document.createTextNode('.')
    cell.appendChild(text);
    empty.appendChild(cell);
  }
  tableBody.appendChild(empty);

  let table = document.getElementsByTagName('thead');
  for (thead of table) {
    for (th of thead.children) {
      //console.log(th);
      //th.classList.add('button');
            //console.log(cell.textContent)
      th.onclick = (clicked) => {moveStone(clicked)};
    }
  }
}

