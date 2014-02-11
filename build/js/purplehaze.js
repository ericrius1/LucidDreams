var Haze;

FW.Haze = Haze = (function() {
  function Haze() {
    this.hazeGroup = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('assets/bullet.png'),
      maxAge: 1
    });
    this.createGrid();
  }

  Haze.prototype.createGrid = function() {
    var emitter, x, y, _i, _results;
    _results = [];
    for (x = _i = 0; _i <= 1; x = ++_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (y = _j = 0; _j <= 1; y = ++_j) {
          emitter = new SPE.Emitter({
            position: new THREE.Vector3(x, y, -50)
          });
          this.hazeGroup.addEmitter(emitter);
          _results1.push(FW.scene.add(this.hazeGroup.mesh));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Haze.prototype.update = function() {
    return this.hazeGroup.tick();
  };

  return Haze;

})();
