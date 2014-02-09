var Director;

FW.Director = Director = (function() {
  function Director() {
    console.log('hey');
  }

  Director.prototype.startShow = function() {
    FW.world = new FW.World();
    return FW.world.animate();
  };

  return Director;

})();
