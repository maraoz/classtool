require('../factory').extend();

function spec(b) {
  function Dummy() {
  };

  Dummy.prototype.foo = function() {
    return 'bar';  
  };
  return Dummy;
};

module.defineClass(spec);
