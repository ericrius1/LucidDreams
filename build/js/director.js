var Director,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.Director = Director = (function() {
  function Director() {
    this.run = __bind(this.run, this);
    this.shiftVoiceTime = 20000;
  }

  Director.prototype.startShow = function() {
    this.startTime = Date.now();
    FW.freqMap = {
      voiceStart: 400,
      voiceEnd: 800
    };
    FW.world = new FW.World();
    return this.run();
  };

  Director.prototype.run = function() {
    requestAnimationFrame(this.run);
    FW.audio.update();
    FW.world.animate();
    if (Date.now() > this.startTime + this.shiftVoiceTime) {
      return FW.freqMap.voiceStart = 450;
    }
  };

  return Director;

})();
