
var factory = require('../factory');

var mocha = require('mocha');
var chai = require('chai');
chai.should();

describe('factory', function() {
  it('should extend module object', function() {
    factory.extend();
    should.exist(module.defineClass);
  });
})
