var World,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.World = World = (function() {
  function World() {
    this.animate = __bind(this.animate, this);
    var light,
      _this = this;
    FW.clock = new THREE.Clock();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.camFar = 2000000;
    FW.width = 1000000;
    FW.camera = new THREE.PerspectiveCamera(45.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
    FW.camera.position.set(0, 600, 1000);
    this.controls = new THREE.OrbitControls(FW.camera);
    FW.scene = new THREE.Scene();
    FW.Renderer = new THREE.WebGLRenderer();
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    document.body.appendChild(FW.Renderer.domElement);
    light = new THREE.DirectionalLight(0xff00ff, 2);
    FW.scene.add(light);
    window.addEventListener("resize", (function() {
      return _this.onWindowResize();
    }), false);
  }

  World.prototype.onWindowResize = function(event) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    return FW.camera.updateProjectionMatrix();
  };

  World.prototype.animate = function() {
    var delta, time;
    requestAnimationFrame(this.animate);
    delta = FW.clock.getDelta();
    time = Date.now();
    this.controls.update();
    return this.render();
  };

  World.prototype.render = function() {
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  return World;

})();
