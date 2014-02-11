var Haze;

FW.Haze = Haze = (function() {
  function Haze() {
    this.hazeGroup = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('assets/bullet.png'),
      maxAge: 1
    });
    this.emitters = [];
    this.createGrid();
  }

  Haze.prototype.createGrid = function() {
    var emitter, x, y, _i, _results;
    _results = [];
    for (x = _i = -16; _i <= 16; x = ++_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (y = _j = -16; _j <= 16; y = ++_j) {
          emitter = new SPE.Emitter({
            position: new THREE.Vector3(x, y, -50)
          });
          this.hazeGroup.addEmitter(emitter);
          this.emitters.push(emitter);
          emitter.disable();
          _results1.push(FW.scene.add(this.hazeGroup.mesh));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Haze.prototype.update = function() {
    var fbd, i, _i, _ref;
    for (i = _i = 0, _ref = FW.freqByteData.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (FW.freqByteData[i]) {
        fbd = FW.freqByteData[i];
        if (fbd > 50) {
          this.emitters[i].enable();
        } else {
          this.emitters[i].disable();
        }
      }
    }
    return this.hazeGroup.tick();
  };

  return Haze;

})();
