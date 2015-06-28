
    var EventEmitter = require('events');
    var util = require('util');
    var testCounter = 0;
    var thisTime = Date.now();

    function Timer () {
      EventEmitter.call(this);

      var self = this;
      var intervalId = null;

        this.start = function(maxTime,maxLag){
          var maxTime = maxTime || 10;
          var maxLag = maxLag || 50;
          var startTime = Date.now();
          var counter = 0;
          var interval = 1000;
          self.emit('start',{startTime: startTime});
          startInterval(interval);
          //  function to kick off the interval with interval as argument
          function startInterval(intervalTime){
            intervalId = setInterval(function () {
              adjustedInterval = null;
              counter++;
              var tickEventTime = Date.now();
              self.emit('tick',{startTime : startTime});
              var lag = tickEventTime - (counter*1000+startTime);
              interval = 1000 - lag;
              if(lag > maxLag){
                self.emit('lag',{offsetTime : lag});
              }
              if(counter >= maxTime){
                // if timer has reached maximum amount of iterations, stop it.
                self.emit('complete',{totalTime : Date.now()-startTime})
                clearInterval(intervalId);
              }
              else{
                // if timer has not been stopped nor has completed, restart timer with adjusted interval.
                clearInterval(intervalId)
                startInterval(interval);
              }

            }, intervalTime);
          }
        }
        this.stop = function(){
          var stopTime = Date.now();
          clearInterval(intervalId);
          self.emit('stopTimer',{stopTime : stopTime});
        }
    }

    util.inherits(Timer, EventEmitter);

    // var myTimer = new Timer();

    // myTimer.addListener('tick',tickLogger)
    // myTimer.addListener('stopTimer',tickLogger)
    // myTimer.addListener('complete',tickLogger)
    // myTimer.addListener('lag',tickLogger)

    // function tickLogger(event){
    //   console.log(event)
    // }

    // myTimer.start(7);



    // setTimeout(myTimer.stop,5000);



module.exports = {
  Timer : Timer,
  EventEmitter : EventEmitter,
  testCounter : testCounter
}
