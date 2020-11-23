
function spikeMovable(origin, target) {
  // prep
  let originPlayer = origin.getStones()[0].getPlayer().getName()
  let targetPlayer
  if (target.getStoneCount()) {
    targetPlayer = target.getStones()[0].getPlayer().getName()
  } else {
    targetPlayer = 'none'
  }

  // spikeMovable
  if (target.getStoneCount() >= 5) {
    throw "spike is full"
  }
  if (target.getStoneCount() > 0 && originPlayer != targetPlayer) {
    throw "player missmatch"
  }

  if (originPlayer == 'weiss' && origin.getNumber() < target.getNumber() || originPlayer == 'schwarz' && origin.getNumber() > target.getNumber()) {
    throw "wrong direction"
  }
  return true
}
