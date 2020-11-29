function init() {

  moveStoneDiv("weiss", 0, 5, 0)
  moveStoneDiv("weiss", 1, 5, 1)
  moveStoneDiv("weiss", 2, 5, 2)
  moveStoneDiv("weiss", 3, 5, 3)
  moveStoneDiv("weiss", 4, 5, 4)

  moveStoneDiv("weiss", 5, 7, 0)
  moveStoneDiv("weiss", 6, 7, 1)
  moveStoneDiv("weiss", 7, 7, 2)

  moveStoneDiv("weiss", 8, 12, 0)
  moveStoneDiv("weiss", 9, 12, 1)
  moveStoneDiv("weiss", 10, 12, 2)
  moveStoneDiv("weiss", 11, 12, 3)
  moveStoneDiv("weiss", 12, 12, 4)

  moveStoneDiv("weiss", 13, 23, 0)
  moveStoneDiv("weiss", 14, 23, 1)

  moveStoneDiv("schwarz", 0, 18, 0)
  moveStoneDiv("schwarz", 1, 18, 1)
  moveStoneDiv("schwarz", 2, 18, 2)
  moveStoneDiv("schwarz", 3, 18, 3)
  moveStoneDiv("schwarz", 4, 18, 4)

  moveStoneDiv("schwarz", 5, 16, 0)
  moveStoneDiv("schwarz", 6, 16, 1)
  moveStoneDiv("schwarz", 7, 16, 2)

  moveStoneDiv("schwarz", 8, 11, 0)
  moveStoneDiv("schwarz", 9, 11, 1)
  moveStoneDiv("schwarz", 10, 11, 2)
  moveStoneDiv("schwarz", 11, 11, 3)
  moveStoneDiv("schwarz", 12, 11, 4)

  moveStoneDiv("schwarz", 13, 0, 0)
  moveStoneDiv("schwarz", 14, 0, 1)
}

function moveStoneDiv(color, stoneNumber, spike, pos) {
  let number = spike
  let leftMargin = 21
  let xoffset = 40
  let yradius = 38
  let yoffset = 460
  let stones = document.getElementsByClassName("stein "+color)

  let y = yoffset-yradius*(pos+1)
  if (spike > 11) {
    number = 23-spike
    y = yradius*pos
  }
  if (number > 5) {
    leftMargin = 331
    number = number-6
  }
  if (pos > 4) {
    return false
  }
  if (stoneNumber > 14) {
    return false
  }

  let stone = stones[stoneNumber]
  if (pos == "none"){
    stone.style.display = "none"
  } else {
    stone.style.display = "block"
    stone.style.transform = "translate3d(" + (leftMargin + xoffset * number) + "px, " + y + "px, 0)"
  }
}
