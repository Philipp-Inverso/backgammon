function init() {
  let game = document.getElementById("spielbrett")
  for (let i=0; i<24; ++i) {
    let foo = document.createElement("div")
    foo.classList.add("dreieck")
    if (i < 12) {
      foo.classList.add("top")
      if (game.childElementCount == 1) {
        foo.classList.add("left")
      }
    } else {
      foo.classList.add("bottom")
    }
    if (game.childElementCount == 7 || game.childElementCount == 19) {
      foo.classList.add("right")
    }
    if (i%2 == 0) {
      foo.classList.add("ungerade")
    }
    game.appendChild(foo)
  }

  for (let i=0; i < 15; ++i) {
    let foo = document.createElement("div")
    foo.classList.add("stein-weiss")
    game.appendChild(foo)
    foo = document.createElement("div")
    foo.classList.add("stein-schwarz")
    game.appendChild(foo)
  }
  foo("weiss", 0, 5, 0)
  foo("weiss", 1, 5, 1)
  foo("weiss", 2, 5, 2)
  foo("weiss", 3, 5, 3)
  foo("weiss", 4, 5, 4)

  foo("weiss", 5, 7, 0)
  foo("weiss", 6, 7, 1)
  foo("weiss", 7, 7, 2)

  foo("weiss", 8, 12, 0)
  foo("weiss", 9, 12, 1)
  foo("weiss", 10, 12, 2)
  foo("weiss", 11, 12, 3)
  foo("weiss", 12, 12, 4)

  foo("weiss", 13, 23, 0)
  foo("weiss", 14, 23, 1)

  foo("schwarz", 0, 18, 0)
  foo("schwarz", 1, 18, 1)
  foo("schwarz", 2, 18, 2)
  foo("schwarz", 3, 18, 3)
  foo("schwarz", 4, 18, 4)

  foo("schwarz", 5, 11, 0)
  foo("schwarz", 6, 11, 1)
  foo("schwarz", 7, 11, 2)

  foo("schwarz", 8, 11, 0)
  foo("schwarz", 9, 11, 1)
  foo("schwarz", 10, 11, 2)
  foo("schwarz", 11, 11, 3)
  foo("schwarz", 12, 11, 4)

  foo("schwarz", 13, 0, 0)
  foo("schwarz", 14, 0, 1)
}

function foo(color, stone, spike, pos) {
  let number = spike
  let leftMargin = 21
  let xoffset = 40
  let yradius = 38
  let yoffset = 460
  let stones = document.getElementsByClassName("stein-"+color)

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
  if (stone > 14) {
    return false
  }

  let foo = stones[stone]
  console.log(y)
  // console.log(number)
  // console.log(leftMargin)
  foo.style.transform = "translate3d(" + (leftMargin + xoffset * number) + "px, " + y + "px, 0)"
}
