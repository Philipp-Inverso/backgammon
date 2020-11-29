function moveStone(clicked) { /// ON_CLICK for thead
  let cell = clicked.target
  let spike = spikes[cell.textContent.slice(1)]
  if (emptyBar) {
    if (spike.getSelectable()) {
      if (doesSpikeContainStoneOfOpponent(spike)) {
        let player = spike.getStones()[0].getPlayer()
        spike.removeStone().setIsInBar(true)
        player.addStonesInBar()
      }
      spike.addStone(getStoneInBar())
      //TODO popTable
      unhighlightSpike(spike)

      if (turn == p0) {
        removeUsedDice(24, spike.getNumber())
      } else {
        removeUsedDice(-1, spike.getNumber())
      }
      if (turn.getStonesInBar()) {
        handleStonesInBar()
      } else {
        emptyBar = false
      }
    } else {
      console.log("spike not selectable")
    }
    return
  }
  if (somethingSelected) {
    // clicked same spike
    if (spike.getSelected()){
      setSpikeSelected(false, selectedSpike)
      setSpikeSelected(false, spike)
    } else {
      handleStoneMovement(spike)
    }
  } else {
    if (spike.getStoneCount()) {
      handleSpikeSelection(spike)
    } else {
      console.log('no stones')
    }
  }
}

function getStoneInBar() {
  for (stone of turn.getStones()) {
    if (stone.getIsInBar()) {
      stone.setIsInBar(false)
      turn.remStonesInBar()
      return stone
    }
  }
}

function handleSpikeSelection(spike) {
  if (isPlayerAbleToSelect(spike)) {
    setSpikeSelected(true, spike)
    setSpikesSelectableForMovement()
  }
}

function isPlayerAbleToSelect(spike) {
  if (!dices.length){
    alert("Please throw dice")
    return false
  }
  if (turn != spike.getStones()[0].getPlayer()) {
    console.log("not your stone")
    return false
  }
  return true
}

function handleStoneMovement(spike) {
  if (spike.getSelectable()) {
    removeUsedDice(selectedSpike.getNumber(), spike.getNumber())
    // stein schlagen
    if (doesSpikeContainStoneOfOpponent(spike)) {
      let player = spike.getStones()[0].getPlayer()
      spike.removeStone().setIsInBar(true)
      player.addStonesInBar()
    }
    spike.addStone(selectedSpike.removeStone())
    //TODO popTable
    setSpikeSelected(false, selectedSpike)
    setSpikeSelected(false, spike)
  } else {
    console.log("spike not selectable")
  }
}

function doesSpikeContainStoneOfOpponent(spike) {
  if (spike.getStoneCount()) {
    if (turn != spike.getStones()[0].getPlayer()) {
      return true
    }
  }
  return false
}

function removeUsedDice(originPos, targetPos) {
  if (turn == p0){
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

function setSpikeSelected(val=true, spike) {
  let cell = spike.getCell()
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
  let number = selectedSpike.getNumber()
  for (target of spikes) {
    if (!spikeMovableTo(selectedSpike, target)) {
      continue
    }
    // select with dice reachable
    if (turn == p0) {
      if (target.getNumber() == number - dices[0] || target.getNumber() == number - dices[1]) {
        highlightSpike(target)
      }
    } else {
      if (target.getNumber() == number + dices[0] || target.getNumber() == number + dices[1]) {
        highlightSpike(target)
      }
    }
  }
}

function spikeMovableTo(origin, target) {
  let number = origin.getNumber()
  let originPlayer = origin.getStones()[0].getPlayer()
  // ignore all numbers in wrong direction
  if (originPlayer == p0) {
    if (target.getNumber() >= number) {
      return false
    }
  } else {
    if (target.getNumber() <= number) {
      return false
    }
  }
  if (isSpikeFullOrOpponent(target)) {
    return false
  }
  return true
}

function isSpikeFullOrOpponent(target) {
  if (target.getStoneCount()) {
    if (turn != target.getStones()[0].getPlayer() && target.getStoneCount() > 1) {
      return true
    }
  }
  if (target.getStoneCount() >= 5) {
    return true
  }
  return false
}

function skipTurn(){
  if (emptyBar) {
    for (spike of spikes) {
      if (spike.getSelectable()){
        return false
      }
    }
  } else {
    let res
    let target
    for (spike of spikes) {
      if (!spike.getStoneCount()) {
        continue
      }
      if (turn != spike.getStones()[0].getPlayer()) {
        continue
      }
      for (dice of dices) {
        if (turn == p0) {
          res = spike.getNumber() - dice
        } else {
          res = spike.getNumber() + dice
        }
        if (0 <= res && res <= 23) {
          target = spikes[res]
        } else {
          continue
        }
        if (target.getStoneCount()) {
          if (turn != target.getStones()[0].getPlayer() && target.getStoneCount() > 1) {
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
    let number
    if (turn == p0) {
      number = selectedSpike.getNumber()+1
    } else {
      number = 24-selectedSpike.getNumber()
    }
    for (stone of turn.getStones()) {
      if (!stone.getIsHome()) {
        console.log("not all stones home")
        return
      }
    }
    if (number != dices[0] && number != dices[1]) {
      console.log("not in range")
      return
    }
    if (turn == p0){
      removeUsedDice(number, 0)
    } else {
      removeUsedDice(24, selectedSpike.getNumber())
    }
    selectedSpike.removeStone().remove()
    setSpikeSelected(false, selectedSpike, selectedCell)
    //TODO popTable
    for (stone of turn.getStones()) {
      if (stone.getIsInGame()) {
        return
      }
    }
    console.log("won")
  }
}
