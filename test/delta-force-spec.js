var chai = require('chai');
var deltaForce  = require('../delta-force.js');
var should = chai.should();
var expect = chai.expect;

describe('delta-force', function () {

  it('timer should be an instance of timer and emitter', function () {
    var testTimer = new deltaForce.Timer();
    expect(testTimer instanceof deltaForce.EventEmitter).to.be.true;
  });

  it('timer should emit a tick event every second', function () {
    var testCounter = deltaForce.testCounter;
    console.log(testCounter)

  });

});