var chai = require('chai');
var deltaForce  = require('../delta-force.js');
var should = chai.should();
var expect = chai.expect;

describe('delta-force', function () {
   this.timeout(12000);
    var testTimer;

  beforeEach(function () {
    testTimer = new deltaForce.Timer();
  });

  it('timer should be an instance of timer and emitter', function () {
    expect(testTimer instanceof deltaForce.EventEmitter).to.be.true;
  });

  // it('timer should emit a tick event every second', function (done) {
  //   var startTime = null;
  //   var stopTime = null;
  //   testTimer.start();
  //   testTimer.addListener('tick',timeTaker)
  //   testTimer.addListener('stopTimer',timeTaker)
  //   function timeTaker(event){
  //     if(event.startTime){
  //       startTime = event.startTime;
  //     }
  //     if(event.stopTime){
  //       stopTime = event.stopTime;
  //     }
  //   }
  //   setTimeout(tester,4000);
  //   function tester(){
  //     console.log('testing 123')
  //     testTimer.stop();
  //     console.log('startTime 123',startTime)
  //     console.log('stopTime 123',stopTime)
  //     expect(startTime).to.not.equal(null);
  //     expect(stopTime).to.not.equal(null);
  //     expect(stopTime>startTime).to.be.true;
  //     done();
  //   }
  // });

  // it('timer should automatically stop after 10 seconds if no argument passed', function (done) {
  //   testTimer.start();
  //   var counter = 0;
  //   testTimer.addListener('tick',tickCounter)
  //   function tickCounter(event){
  //     counter++;
  //   }
  //   setTimeout(tester,11000);
  //   function tester(){
  //     console.log('counter',counter)
  //     expect(counter).to.equal(10);
  //     done();
  //   }

  // });
  // it('should stop after n seconds being passed argument n', function (done) {
  //   testTimer.start(3);
  //   var counter = 0;
  //   testTimer.addListener('tick',tickCounter)
  //   function tickCounter(event){
  //     counter++;
  //   }
  //   setTimeout(tester,11000);
  //   function tester(){
  //     console.log('counter',counter)
  //     expect(counter).to.equal(3);
  //     done();
  //   }
  // });
  it('should not emit lag events after compensate has been accounted for', function (done) {
    testTimer.start();
    var lags = false;
    testTimer.addListener('lag',logLags);
    function logLags(){
      lags = true;
    }
    setTimeout(tester,11000);
    function tester(){
      expect(lags).to.be.false;
      done();
    }

  });

});