var Director;

FW.Director = Director = (function() {
  function Director() {
    console.log('hey');
  }

  Director.prototype.startShow = function() {
    FW.freqMap = {
      voiceStart: 200,
      voiceEnd: 1000
    };
    FW.world = new FW.World();
    return FW.world.animate();
  };

  return Director;

})();
