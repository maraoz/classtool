// Define functions and methods used for simulating class like structures
// including inheritance.  An important feature of this system is that it
// enabled one to define a class like structure while controlling all bindings
// to the outside world (there is never a reason to make use "require()" directly
// in a class definition...instead, bindings are passed into the class when the
// class is loaded using loadClass().  Additionally, this system allows a class
// to be instantiated multiple times, which enables a more compositional approach
// to inheritance. 

global.supercall = function(receiver, constructor, method, args) {
  if(typeof method == 'string') {
    constructor._super.prototype[method].apply(receiver, args);
  } else {
    //method is really args...used for calling the parent constructor
    //on the receiver
    constructor._super.apply(receiver, method);
  }
}

module.__proto__.defineClass = function(constructor) {
  //Load the class defined in the module.  If bindings are supplied, they override
  //the default bindings supplied by the class definition.
  this.exports.loadClass = function(bindings) {
    var tmp = new constructor();
    var answer = tmp.class;
    answer.inherit = function(parent) {
      if(arguments.length > 1) {
        // this allows chaining multiple classes in the call
        parent.inherit(Array.prototype.slice.call(arguments, 1));
      }   
      this._super = parent;
      Object.defineProperty(this.prototype, '_constructor', {enumerable: false, value: this});
      this.prototype.__proto__ = parent.prototype;
      this.__proto__ = parent;
    }
    if(!bindings) bindings = {};
    if(tmp.bindings) tmp.bindings(bindings, function() {
      answer.inherit.apply(answer,arguments);
    });
    if(answer.initialize) answer.initialize();
    return answer;
  };

  // createClass seems like a better name than loadClass
  this.exports.createClass = this.exports.loadClass;

  //Return the class if it has already been constructed, if not, create
  //it and set exports.theClass to the newly constructed class
  this.exports.class = function(bindings) {
    if(this.theClass) return this.theClass;
    this.theClass = this.loadClass(bindings);
    return this.theClass;
  }
}
