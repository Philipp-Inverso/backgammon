  function roll(){
    console.log(Math.ceil(Math.random()*6))
  }

function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
  };
}

var p0 = new Person('ich')
var p1 = new Person('du')

console.log(p0.name)
console.log(p0.name)
