Dice = {
  getRandomIntInclusive : function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  },
  foo : this.getRandomIntInclusive(1,6)
}
