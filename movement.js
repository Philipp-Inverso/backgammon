function moveStone(clicked) { /// ON_CLICK for thead
  let cell = clicked.target;
  let spike = spikes[cell.textContent.slice(1)];
  // DEBUG
  //if (p0.getName()==turn){console.log(p0.getStonesInBar())}
  //else {console.log(p1.getStonesInBar())}
  // ====
  if (emptyBar) {
    if (spike.getSelectable()) {

      if (doesSpikeContainStoneOfOpponent(spike)) {
        let stone = spike.getStones()[0]
        let player = stone.getPlayer()
        spike.removeStone().setIsInBar(true)
        player.addStonesInBar()
      }
      spike.addStone(getStoneInBar())
      populateTable()
      unhighlightSpike(spike)

      if (turn == p0.getName()) {
        removeUsedDice(24, spike.getNumber())
        if (p0.getStonesInBar()) {
          handleStonesInBar(p0)
        } else {
          emptyBar = false
        }
      } else {
        removeUsedDice(-1, spike.getNumber())
        if (p1.getStonesInBar()) {
          handleStonesInBar(p1)
        } else {
          emptyBar = false
        }
      }
    } else {
      console.log("spike not selectable")
    }
    return
  }
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

function getStoneInBar() {
  if (turn == p0.getName()){
    for (stone of p0.getStones()) {
      if (stone.getIsInBar()) {
        stone.setIsInBar(false)
        p0.remStonesInBar()
        return stone
      }
      continue
    }
  } else {
    for (stone of p1.getStones()) {
      if (stone.getIsInBar()) {
        stone.setIsInBar(false)
        p1.remStonesInBar()
        return stone
      }
      continue
    }
  }
}

function handleSpikeSelection(cell, spike) {
  if (isPlayerAbleToSelect(spike)) {
    setSpikeSelected(true, spike, cell)
    setSpikesSelectableForMovement()
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
  if (spike.getSelectable()) {
    removeUsedDice(selectedSpike.getNumber(), spike.getNumber())
    // stein schlagen
    if (doesSpikeContainStoneOfOpponent(spike)) {
      let stone = spike.getStones()[0]
      let player = stone.getPlayer()
      spike.removeStone().setIsInBar(true)
      player.addStonesInBar()
    }
    spike.addStone(selectedSpike.removeStone())
    populateTable()
    setSpikeSelected(false, selectedSpike, selectedCell)
    setSpikeSelected(false, spike, cell)
  } else {
    console.log("spike not selectable")
  }
}

function doesSpikeContainStoneOfOpponent(spike) {
  if (spike.getStoneCount()) {
    let stone = spike.getStones()[0]
    let player = stone.getPlayer()
    if (player.getName() != turn) {
      return true
    }
  }
  return false
}

function removeUsedDice(originPos, targetPos) {
  if (turn == p0.getName()){
    if (dices.indexOf(originPos - targetPos) == 0) {
      dices = dices.reverse()
    }
  } else {
    if (dices.indexOf(targetPos - originPos) == 0) {
      dices = dices.reverse()
    }
  }
  dices.pop()
  updateHTML()
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

function unhighlightSpike(spike) {
  spike.setSelectable(false)
  spike.getCell().classList.remove("selectable")
}

function highlightSpike(spike) {
  spike.setSelectable(true)
  spike.getCell().classList.add("selectable")
}

function setSpikesSelectableForMovement() {
  let origin = selectedSpike
  let number = origin.getNumber()
  let originPlayer = origin.getStones()[0].getPlayer().getName()
  for (target of spikes) {
    if (!spikeMovableTo(origin, target)) {
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
      return false
    }
  } else {
    if (target.getNumber() <= number) {
      return false
    }
  }
  if (isSpikeFullOrOpponent(originPlayer, target)) {
    return false
  }
  return true
}

function isSpikeFullOrOpponent(currentPlayer, target) {
  let targetPlayer
  // get targetPlayer
  if (target.getStoneCount()) {
    targetPlayer = target.getStones()[0].getPlayer().getName()
  } else {
    targetPlayer = "None"
  }
  if (targetPlayer != "None" && targetPlayer != currentPlayer && target.getStoneCount() > 1) {
    return true
  }
  if (target.getStoneCount() >= 5) {
    return true
  }
  return false
}

function skipTurn(){
  let target
  if (emptyBar) {
    for (spike of spikes) {
      if (turn == p0.getName()) {
        if (17 < spike.getNumber() && spike.getNumber() < 24) {
          if (!isSpikeFullOrOpponent(p0.getName(), spike)) {
            if (spike.getNumber() == dice[0] || spike.getNumber() == dice[1]) {
              return false
            }
          }
        }
      } else {
        if (0 < spike.getNumber() && spike.getNumber() < 6) {
          if (!isSpikeFullOrOpponent(p1.getName(), spike)) {
            if (spike.getNumber() == dice[0] || spike.getNumber() == dice[1]) {
              return false
            }
          }
        }
      }
    }
  } else {
    for (spike of spikes) {
      if (!spike.getStoneCount()) {
        continue
      }
      if (spike.getStones()[0].getPlayer().getName() != turn) {
        continue
      }
      for (dice of dices) {
        if (p0.getName() == turn) {
          let res = spike.getNumber() - dice
          if (0 <= res && res <= 23) {
            target = spikes[res]
          } else {
            continue
          }
        } else {
          let res = spike.getNumber() + dice
          if (0 <= res && res <= 23) {
            target = spikes[res]
          } else {
            continue
          }
        }
        if (target.getStoneCount()) {
          if (target.getStones()[0].getPlayer().getName() != turn) {
            continue
          }
        }
        if (target.getStoneCount() < 5) {
          return false
        }
      }
    }
  }
  return true
}

function removeStone() {
  if (somethingSelected) { // select should check for selectable spike
    let player
    let number
    if (turn == p0.getName()) {
      player = p0
      number = selectedSpike.getNumber()+1
    } else {
      player = p1
      number = 24-selectedSpike.getNumber()
    }
    for (stone of player.getStones()) {
      if (!stone.getIsHome()) {
        console.log("not all stones home")
        return
      }
    }
    if (number != dices[0] && number != dices[1]) {
      console.log("not in range")
      return
    }
    if (turn = p0.getName()){
      removeUsedDice(selectedSpike.getNumber(), 0)
    } else {
      removeUsedDice(24, selectedSpike.getNumber())
    }
    selectedSpike.removeStone().remove()
    setSpikeSelected(false, selectedSpike, selectedCell)
    populateTable()
    for (stone of player.getStones()) {
      if (stone.getIsInGame()) {
        return
      }
    }
    console.log("won")
  }
}
