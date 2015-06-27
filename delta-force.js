
    var EventEmitter = require('events');
    var util = require('util');
    var testCounter = 0;
    var thisTime = Date.now();

    function Timer () {
      EventEmitter.call(this);

      var self = this;
      var intervalId = null;
        // self.i = 0;

        this.start = function(){

          var startTime = Date.now();
          intervalId = setInterval(function () {
            self.emit('tick',{startTime : startTime});
            }, 1000);
        }
        this.stop = function(){
          var stopTime = Date.now();
          clearInterval(intervalId);
          self.emit('stopTimer',{stopTime : stopTime});
        }
    }

    util.inherits(Timer, EventEmitter);

    var myTimer = new Timer();
        // console.log(myTimer)

    // function tickTester(event){
    //   console.log('running')
    //   testCounter++;
    //   if(Date.now() > thisTime+10000){
    //     myTimer.removeListener('tick',tickTester);
    //     console.log('timer ended counter:',testCounter)
    //   }
    // }
    myTimer.addListener('tick',tickLogger)
    myTimer.addListener('stopTimer',tickLogger)

    function tickLogger(event){
      console.log(event)
    }

    myTimer.start();

    console.log('hello')



    setTimeout(myTimer.stop,5000);

    // myTimer.stop();


    // var myTimer = new Timer();

    // console.log(Date.now())



module.exports = {
  Timer : Timer,
  EventEmitter : EventEmitter,
  testCounter : testCounter
}
