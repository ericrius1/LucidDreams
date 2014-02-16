var Director,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.Director = Director = (function() {
  function Director() {
    this.run = __bind(this.run, this);
    this.shiftVoiceTime = 10000;
  }

  Director.prototype.startShow = function() {
    this.startTime = Date.now();
    FW.freqMap = {
      voiceStart: 400,
      voiceEnd: 600
    };
    FW.world = new FW.World();
    return this.run();
  };

  Director.prototype.run = function() {
    requestAnimationFrame(this.run);
    FW.audio.update();
    FW.world.animate();
    return FW.freqMap.voiceStart += .01;
  };

  return Director;

})();
