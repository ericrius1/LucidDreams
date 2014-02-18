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
    FW.camera.position.z = 20;
    this.controls = new THREE.TrackballControls(FW.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    FW.scene = new THREE.Scene();
    this.initSceneObjects();
    FW.Renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    document.body.appendChild(FW.Renderer.domElement);
    window.addEventListener("resize", (function() {
      return _this.onWindowResize();
    }), false);
  }

  World.prototype.initSceneObjects = function() {
    var attributes, floorGeo, floorMaterial, floorMesh, light, v, values, vertices, _i, _ref;
    light = new THREE.DirectionalLight(0xaa00aa, 1);
    light.position.set(0, 1, 0);
    FW.scene.add(light);
    light = new THREE.DirectionalLight(0x44aaaa, 1);
    light.position.set(0, -1, 0);
    FW.scene.add(light);
    attributes = {
      displacement: {
        type: 'f',
        value: []
      }
    };
    floorGeo = new THREE.IcosahedronGeometry(20, 4);
    floorMaterial = new THREE.ShaderMaterial({
      attributes: attributes,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    });
    floorMesh = new THREE.Mesh(floorGeo, floorMaterial);
    floorMesh.position.y = -10;
    floorMesh.rotation.x = -Math.PI / 2;
    vertices = floorMesh.geometry.vertices;
    values = attributes.displacement.value;
    for (v = _i = 0, _ref = vertices.length; 0 <= _ref ? _i < _ref : _i > _ref; v = 0 <= _ref ? ++_i : --_i) {
      values.push(Math.random() * 5);
    }
    return FW.scene.add(floorMesh);
  };

  World.prototype.onWindowResize = function(event) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    return FW.camera.updateProjectionMatrix();
  };

  World.prototype.animate = function() {
    return this.render();
  };

  World.prototype.render = function() {
    var delta;
    delta = FW.clock.getDelta();
    this.controls.update();
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  return World;

})();
