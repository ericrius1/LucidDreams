
FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    @camFar = 2000000
    FW.width = 1000000

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(45.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, 600, 1000
    
    #CONTROLS
    @controls = new THREE.OrbitControls(FW.camera)

    # SCENE 
    FW.scene = new THREE.Scene()



    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer()
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement

    #LIGHTING
    light = new THREE.DirectionalLight 0xff00ff, 2
    FW.scene.add light


    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false

  
  onWindowResize : (event) ->
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  animate : =>
    requestAnimationFrame @animate
    delta = FW.clock.getDelta()
    time = Date.now()
    @controls.update()
    @render()
  render : ->
    FW.Renderer.render( FW.scene, FW.camera );

