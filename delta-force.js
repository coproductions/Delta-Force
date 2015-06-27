
    var EventEmitter = require('events');
    var util = require('util');
    var testCounter = 0;
    var thisTime = Date.now();

    function Timer () {
      EventEmitter.call(this);

      var self = this;
      var intervalId = null;
        // self.i = 0;

        this.start = function(maxTime){
          var max = maxTime || 10;
          var startTime = Date.now();
          intervalId = setInterval(function () {
            self.emit('tick',{startTime : startTime});
            if(Date.now() > startTime+(max*1000)){
              self.emit('complete',{totalTime : Date.now()-startTime})
              clearInterval(intervalId);
            }
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

    myTimer.addListener('tick',tickLogger)
    myTimer.addListener('stopTimer',tickLogger)
    myTimer.addListener('complete',tickLogger)

    function tickLogger(event){
      console.log(event)
    }

    myTimer.start(5);



    // setTimeout(myTimer.stop,5000);



module.exports = {
  Timer : Timer,
  EventEmitter : EventEmitter,
  testCounter : testCounter
}
