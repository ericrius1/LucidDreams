var Director;

FW.Director = Director = (function() {
  function Director() {
    console.log('hey');
  }

  Director.prototype.startShow = function() {
    return FW.world = new FW.World();
  };

  return Director;

})();
