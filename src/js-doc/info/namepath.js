Person = function () {
  this.say = function () {
    return "I'm an instance.";
  }
  function say() {
    return "I'm inner";
  }
};
Person.say = function () {
  return "I'm a static";
};

var p = new Person();
p.say();
Person.say();