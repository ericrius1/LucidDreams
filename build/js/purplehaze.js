var Haze;

FW.Haze = Haze = (function() {
  function Haze() {
    this.numEmitters = 1000;
    this.voiceGroup = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
      maxAge: 0.5
    });
    this.emitters = [];
    this.createVoiceCloud();
  }

  Haze.prototype.createVoiceCloud = function() {
    var color, emitter, x, _i, _ref, _results;
    _results = [];
    for (x = _i = 0, _ref = this.numEmitters; 0 <= _ref ? _i < _ref : _i > _ref; x = 0 <= _ref ? ++_i : --_i) {
      color = new THREE.Color();
      color.setRGB(rnd(0.6, 1), rnd(0, 0.4), rnd(0.6, 1.0));
      emitter = new SPE.Emitter({
        position: new THREE.Vector3(rnd(-10, 10), rnd(-10, 10), rnd(-10, -60)),
        opacityStart: 1,
        particleCount: 50,
        positionSpread: new THREE.Vector3(.1, .1, .1),
        colorStart: color,
        opacityEnd: 0.0
      });
      this.voiceGroup.addEmitter(emitter);
      this.emitters.push(emitter);
      emitter.disable();
      _results.push(FW.scene.add(this.voiceGroup.mesh));
    }
    return _results;
  };

  Haze.prototype.update = function() {
    var emitterIndex, fbd, i, _i, _ref, _ref1;
    for (i = _i = _ref = FW.freqMap.voiceStart, _ref1 = FW.freqMap.voiceEnd; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
      if (FW.freqByteData[i]) {
        fbd = FW.freqByteData[i];
        emitterIndex = Math.floor(map(i, FW.freqMap.voiceStart, FW.freqMap.voiceEnd, 0, this.numEmitters - 1));
        if (fbd > 5) {
          this.emitters[emitterIndex].enable();
        } else {
          this.emitters[emitterIndex].disable();
        }
      }
    }
    return this.voiceGroup.tick();
  };

  return Haze;

})();
