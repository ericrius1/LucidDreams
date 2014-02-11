var Haze;

FW.Haze = Haze = (function() {
  function Haze() {
    var texture;
    this.numEmitters = 1024;
    this.hazeEmitters = [];
    this.curXPos = -500;
    texture = THREE.ImageUtils.loadTexture('assets/smokeparticle.png');
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    this.hazeGroup = new ShaderParticleGroup({
      texture: texture,
      maxAge: 1
    });
    this.initializeHaze();
    FW.scene.add(this.hazeGroup.mesh);
  }

  Haze.prototype.initializeHaze = function() {
    var colorStart, hazeEmitter, i, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = this.numEmitters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      colorStart = new THREE.Color();
      colorStart.setRGB(Math.random(), Math.random(), Math.random());
      hazeEmitter = new ShaderParticleEmitter({
        position: new THREE.Vector3(this.curXPos, 0, -50),
        colorStart: colorStart,
        colorEnd: colorStart,
        particlesPerSecond: 1,
        opacityStart: 1,
        opacityEnd: 1
      });
      this.hazeGroup.addEmitter(hazeEmitter);
      hazeEmitter.disable();
      this.hazeEmitters.push(hazeEmitter);
      _results.push(this.curXPos += 1);
    }
    return _results;
  };

  Haze.prototype.update = function() {
    return this.hazeGroup.tick();
  };

  return Haze;

})();
