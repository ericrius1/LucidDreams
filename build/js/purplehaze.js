var Haze;

FW.Haze = Haze = (function() {
  function Haze() {
    this.numEmitters = 300;
    this.activationThreshold = 40;
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
        position: new THREE.Vector3(rnd(-3, 3), rnd(-4, 4), rnd(-20, -50)),
        opacityStart: 1,
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
    var emitter, end, i, start, totalFbd, _i, _j, _k, _len, _len1, _ref, _ref1;
    start = Math.round(FW.freqMap.voiceStart);
    end = Math.round(FW.freqMap.voiceEnd);
    _ref = this.emitters;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      emitter = _ref[_i];
      emitter.disable();
    }
    totalFbd = 0;
    for (i = _j = start; start <= end ? _j < end : _j > end; i = start <= end ? ++_j : --_j) {
      if (FW.freqByteData[i]) {
        totalFbd += FW.freqByteData[i];
      }
      if (totalFbd > this.activationThreshold) {
        _ref1 = this.emitters;
        for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
          emitter = _ref1[_k];
          if (Math.random() < 0.05) {
            emitter.enable();
          }
        }
        break;
      }
    }
    return this.voiceGroup.tick();
  };

  return Haze;

})();
