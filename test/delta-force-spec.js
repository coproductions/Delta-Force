var chai = require('chai');
var deltaForce  = require('../delta-force.js');
var should = chai.should();
var expect = chai.expect;

describe('delta-force', function () {

  it('timer should be an instance of timer and emitter', function () {
    var testTimer = new deltaForce.Timer();
    expect(testTimer instanceof deltaForce.EventEmitter).to.be.true;
  });

  it('timer should emit a tick event every second', function (done) {
    var testTimer = new deltaForce.Timer();
    var startTime = null;
    var stopTime = null;
    testTimer.start();
    testTimer.addListener('tick',timeTaker)
    testTimer.addListener('stopTimer',timeTaker)
    function timeTaker(event){
      if(event.startTime){
        startTime = event.startTime;
      }
      if(event.stopTime){
        stopTime = event.stopTime;
      }
    }
    setTimeout(tester,1000);
    function tester(){
      console.log('testing')
      testTimer.stop();
      expect(startTime).to.not.equal(null);
      expect(stopTime).to.not.equal(null);
      expect(stopTime>startTime).to.be.true;
      done();
    }
  });

});