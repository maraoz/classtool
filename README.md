Classtool
=========

This is a simple tool to enable class like idioms in JavaScript.  It is notably different
from traditional class based inheritance in the following ways:

- inheritance structure is not part of the class definition
- bindings to the outside are explicitly declared
- default bindings allow for easy class creation while preserving override capability

The following is an example class definition:

    function ClassSpec() {
      var fs; // example of a binding
   
      this.bindings = function(b) {
        fs = b.fs || require('fs');
      };
   
      function Class() {
        // Body of constructor function
      };
      this.class = Class;
   
      Class.prototype.methodA = function() {
        // Body of method A
      };
   
      Class.prototype.methodB = function() {
        // Body of method B
      };
    };
    module.defineClass(ClassSpec); 

There are two ways to instantiate the class in client code:

    var MyClass = require('./path/to/classfile').class();
    var MyClass = require('./path/to/classfile').loadClass({fs: mockFileSystem});

In the first example, each call will return the same class instance.  In the second
example, each call returns a new class instance.  The second call also shows how you
would override the default bindings (passing in an object meant to mimic the file 
system in this example).  You can also override the default bindings with the class()
constructor method, however the overrides would be ignored on subsequent calls (for
that reason, it's probably best to only override bindings using the loadClass() method.

To create instances of your class, do the following:

    new MyClass();

You can of course pass arguments to this constructor.

To create an inheritance chain, use the method inherit() as follows:

    MyClass.inherit(MyOtherClass);

To invoke a method from a superclass use supercall as follows:

    function Class() {
      supercall(this, Class, arguments);
    };

In a normal method (non constructor) do:

    Class.prototype.methodA = function() {
      supercall(this, Class, 'methodA', arguments);
    };
