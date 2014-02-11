var World,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.World = World = (function() {
  function World() {
    this.animate = __bind(this.animate, this);
    var _this = this;
    FW.clock = new THREE.Clock();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.camFar = 2000;
    FW.audio.masterGain.value = 1;
    FW.camera = new THREE.PerspectiveCamera(45.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
    this.controls = new THREE.PathControls(FW.camera);
    this.controls.waypoints = [[0, 0, 0]];
    this.controls.duration = 1000;
    this.controls.useConstantSpeed = true;
    this.controls.createDebugPath = true;
    this.controls.createDebugDummy = true;
    this.controls.lookSpeed = .00001;
    this.controls.lookVertical = true;
    this.controls.lookHorizontal = true;
    this.controls.init();
    FW.scene = new THREE.Scene();
    FW.scene.add(this.controls.animationParent);
    this.initSceneObjects();
    FW.Renderer = new THREE.WebGLRenderer();
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    document.body.appendChild(FW.Renderer.domElement);
    window.addEventListener("resize", (function() {
      return _this.onWindowResize();
    }), false);
    this.controls.animation.play(true, 0);
  }

  World.prototype.initSceneObjects = function() {
    var i, light, material, mesh, _i;
    light = new THREE.DirectionalLight(0xaa00aa, 1);
    light.position.set(0, 1, 0);
    FW.scene.add(light);
    light = new THREE.DirectionalLight(0x44aaaa, 1);
    light.position.set(0, -1, 0);
    FW.scene.add(light);
    material = new THREE.MeshPhongMaterial({
      color: 0xc0ffee,
      emissive: 0x004477,
      specular: 0x440077,
      diffuse: 0x440077,
      shininess: 100000,
      ambient: 0x110000,
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      opacity: 1,
      transparent: true
    });
    this.pulseGeo = new THREE.IcosahedronGeometry(1, 2);
    this.pulseData = this.pulseGeo.clone();
    for (i = _i = 0; _i <= 1; i = ++_i) {
      mesh = new THREE.Mesh(this.pulseGeo, material);
      mesh.position.set(rnd(-10, 10), rnd(-10, 10), -50);
      mesh.rotation.z = (i / 20) * Math.PI * 2;
    }
    return this.haze = new FW.Haze();
  };

  World.prototype.updateAudio = function() {
    this.freqByteData = new Uint8Array(FW.audio.masterAnalyser.frequencyBinCount);
    return FW.audio.masterAnalyser.getByteFrequencyData(this.freqByteData);
  };

  World.prototype.updatePulseGeo = function() {
    var fbd, i, _i, _ref;
    for (i = _i = 0, _ref = this.pulseGeo.vertices.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (this.freqByteData[i]) {
        fbd = this.freqByteData[i];
        this.pulseGeo.vertices[i].x = this.pulseData.vertices[i].x * (.5 + fbd / 100);
        this.pulseGeo.vertices[i].y = this.pulseData.vertices[i].y * (.5 + fbd / 100);
        this.pulseGeo.vertices[i].z = this.pulseData.vertices[i].z * (.5 + fbd / 100);
      }
    }
    return this.pulseGeo.verticesNeedUpdate = true;
  };

  World.prototype.onWindowResize = function(event) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    return FW.camera.updateProjectionMatrix();
  };

  World.prototype.animate = function() {
    this.updateAudio();
    this.updatePulseGeo();
    this.haze.update();
    this.render();
    return requestAnimationFrame(this.animate);
  };

  World.prototype.render = function() {
    var delta;
    delta = FW.clock.getDelta();
    THREE.AnimationHandler.update(delta);
    this.controls.update(delta);
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  return World;

})();
