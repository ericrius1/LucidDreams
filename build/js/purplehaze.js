var Haze;

FW.Haze = Haze = (function() {
  function Haze() {
    this.voiceGroup = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
      maxAge: 1
    });
    this.emitters = [];
    this.createVoiceCloud();
  }

  Haze.prototype.createVoiceCloud = function() {
    var color, emitter, x, _i, _results;
    _results = [];
    for (x = _i = 0; _i < 1024; x = ++_i) {
      color = new THREE.Color();
      color.setRGB(rnd(0.8, 1), rnd(0, 0.2), rnd(0.8, 1.0));
      emitter = new SPE.Emitter({
        position: new THREE.Vector3(rnd(-10, 10), rnd(-10, 10), rnd(-20, -60)),
        opacityStart: 1,
        particleCount: 100,
        positionSpread: new THREE.Vector3(.2, .2, .2),
        colorStart: color
      });
      this.voiceGroup.addEmitter(emitter);
      this.emitters.push(emitter);
      emitter.disable();
      _results.push(FW.scene.add(this.voiceGroup.mesh));
    }
    return _results;
  };

  Haze.prototype.update = function() {
    var fbd, i, _i, _ref, _ref1, _ref2;
    for (i = _i = 0, _ref = FW.freqByteData.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (FW.freqByteData[i]) {
        fbd = FW.freqByteData[i];
        if (fbd > 150) {
          if ((_ref1 = this.emitters[i]) != null) {
            _ref1.enable();
          }
        } else {
          if ((_ref2 = this.emitters[i]) != null) {
            _ref2.disable();
          }
        }
      }
    }
    return this.voiceGroup.tick();
  };

  return Haze;

})();
