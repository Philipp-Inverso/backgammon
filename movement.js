function moveStone(clicked) { /// ON_CLICK for thead
  let cell = clicked.target;
  let spike = spikes[cell.textContent.slice(1)];
  if (somethingSelected) {
    // clicked same spike
    if (spike.getSelected()){
      setSpikeSelected(false, selectedSpike, selectedCell)
      setSpikeSelected(false, spike, cell)
    } else {
      handleStoneMovement(cell, spike)
    }
  } else {
    if (spike.getStoneCount()) {
      handleSpikeSelection(cell, spike)
    } else {
      console.log('no stones')
    }
  }
}

function handleSpikeSelection(cell, spike) {
  //if (p0.getName() == turn){
  //    handleStonesInBar(p0)
  //} else {
  //    handleStonesInBar(p0)
  //}
  if (isPlayerAbleToSelect(spike)) {
    setSpikeSelected(true, spike, cell)
    setSpikesSelectableCss()
  }
}

function handleStonesInBar(player) {
  if (player.getStonesInBar()) {
    revSpikes = spikes.reverse()
    for (target of revSpikes) {
      if (target.getNumber() > 18) {
        break
      }

      try {
        isSpikeFullOrOpponent(player, target)
      } catch(err) {
        console.log(err)
        continue
      }

      highlightSpike(target);
    }
  }
}

function isPlayerAbleToSelect(spike) {
  if (!dices.length){
    alert("Please throw dice")
    return false
  }
  if (spike.getStones()[0].getPlayer().getName() != turn) {
    console.log("not your stone")
    return false
  }
  return true
}

function handleStoneMovement(cell, spike) {
  console.log(spike.getNumber())
  if (spike.getSelectable()) {
    if (turn == p0.getName()){
      if (dices.indexOf(selectedSpike.getNumber() - spike.getNumber()) == 0) {
        dices = dices.reverse()
      }
    } else {
      if (dices.indexOf(spike.getNumber() - selectedSpike.getNumber()) == 0) {
        dices = dices.reverse()
      }
    }
    dices.pop()
    // if (spike.getStoneCount()) {
    //   let stone = spike.getStones()[0]
    //   let player = stone.getPlayer()
    //   console.log(player.getName())
    //   if (player.getName() != turn) {
    //     spike.removeStone().setIsInBar(true)
    //     player.addStonesInBar()
    //   }
    // }
    spike.addStone(selectedSpike.removeStone())
    populateTable()
    setSpikeSelected(false, selectedSpike, selectedCell)
    setSpikeSelected(false, spike, cell)
  } else {
    console.log("spike not selectable")
  }
}

function setSpikeSelected(val=true, spike, cell) {
  if (val) {
    somethingSelected = true
    selectedSpike = spike
    selectedCell = cell
    spike.setSelected()
    cell.classList.remove("unselected")
    cell.classList.add("selected")
  } else {
    somethingSelected = false
    selectedSpike = undefined
    selectedCell = undefined
    spike.setSelected(false)
    cell.classList.remove("selected")
    cell.classList.add("unselected")
    unhighlightSpikes()
  }
}

function unhighlightSpikes() {
  for (spike of spikes) {
    spike.setSelectable(false)
    spike.getCell().classList.remove("selectable")
  }
}

function highlightSpike(spike) {
  spike.setSelectable(true)
  spike.getCell().classList.add("selectable")
}

function setSpikesSelectableCss() {
  let origin = selectedSpike
  let number = origin.getNumber()
  let originPlayer = origin.getStones()[0].getPlayer().getName()
  for (target of spikes) {
    try {
      spikeMovableTo(origin, target)
    } catch(err) {
      console.log(err)
      continue
    }

    // select with dice reachable
    if (originPlayer == p0.getName()) {
      if (target.getNumber() == number - dices[0] || target.getNumber() == number - dices[1]) {
        highlightSpike(target)
      }
    } else if (originPlayer == p1.getName()) {
      if (target.getNumber() == number + dices[0] || target.getNumber() == number + dices[1]) {
        highlightSpike(target)
      }
    }
  }
}

function spikeMovableTo(origin, target) {
  let number = origin.getNumber()
  let originPlayer = origin.getStones()[0].getPlayer().getName()
  let targetPlayer

  // ignore all numbers in wrong direction
  if (originPlayer == p0.getName()) {
    if (target.getNumber() >= number) {
      throw "wrong direction"
    }
  } else {
    if (target.getNumber() <= number) {
      throw "wrong direction"
    }
  }

  try {
    isSpikeFullOrOpponent(originPlayer, target)
  } catch(err) {
    console.log(err)
    throw err
  }
}

function isSpikeFullOrOpponent(currentPlayer, target) {
  let targetPlayer

  // get targetPlayer
  if (target.getStoneCount()) {
    targetPlayer = target.getStones()[0].getPlayer().getName()
  } else {
    targetPlayer = "None"
  }

  // TODO stein schlagen
  if (targetPlayer != "None" && targetPlayer != currentPlayer && target.getStoneCount() > 0) {
    throw "opponents spike"
  }
  if (target.getStoneCount() >= 5) {
    throw "spike full"
  }
}

