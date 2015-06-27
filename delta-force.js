
    var EventEmitter = require('events');
    var util = require('util');
    var testCounter = 0;
    var thisTime = Date.now();

    function Timer () {
      EventEmitter.call(this);

      var self = this;
      var intervalId = null;
        // self.i = 0;

        this.start = function(maxTime,maxLag){
          var maxTime = maxTime || 10;
          var maxLag = maxLag || 50;
          var startTime = Date.now();
          var counter = 0;
          intervalId = setInterval(function () {
            counter++;
            console.log(counter)
            var tickEventTime = Date.now();
            self.emit('tick',{startTime : startTime});
            var lag = tickEventTime - (counter*1000+startTime);
            console.log(lag)
            if(lag > maxLag){
              self.emit('lag',{offsetTime : lag});
            }
            if(tickEventTime > startTime+(maxTime*1000)){
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
    myTimer.addListener('lag',tickLogger)

    function tickLogger(event){
      console.log(event)
    }

    myTimer.start(7);



    // setTimeout(myTimer.stop,5000);



module.exports = {
  Timer : Timer,
  EventEmitter : EventEmitter,
  testCounter : testCounter
}
