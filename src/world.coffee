
FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    @camFar = 2000
    FW.audio.masterGain.value = 1

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(45.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    
    #CONTROLS
    @controls = new THREE.PathControls(FW.camera)
    @controls.waypoints = [ [ 0, 0, 0], [0, 0, -60] ];
    @controls.duration = 280
    @controls.useConstantSpeed = true
    @controls.lookSpeed = .0001
    @controls.lookVertical = true
    @controls.lookHorizontal = true

    @controls.init()

    # SCENE 
    FW.scene = new THREE.Scene()
    FW.scene.add @controls.animationParent
    @initSceneObjects()




    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer()
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement

    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false

    #start animation
    @controls.animation.play(true, 0)

  initSceneObjects: ->
    light = new THREE.DirectionalLight( 0xaa00aa , 1 )
    light.position.set( 0 , 1 , 0 );

    FW.scene.add light

    light = new THREE.DirectionalLight( 0x44aaaa , 1 )
    light.position.set( 0 , -1 , 0 )

    FW.scene.add( light )

    material = new THREE.MeshPhongMaterial
      color:        0xc0ffee
      emissive:     0x004477
      specular:     0x440077
      diffuse:      0x440077
      shininess:     100000
      ambient:      0x110000
      shading:      THREE.FlatShading
      side:         THREE.DoubleSide
      opacity:      1
      transparent:  true
        

    #We create a geometry, and then we copy, 
    #So that we have an unaltered version to compare
    @pulseGeo  = new THREE.IcosahedronGeometry(1 , 2 );
    @pulseData = @pulseGeo.clone();


    for i in [0..1]
      mesh = new THREE.Mesh( @pulseGeo , material )
      mesh.position.set(rnd(-10, 10), rnd(-10, 10), -50)
      mesh.rotation.z = (i / 20) * Math.PI * 2
      # FW.scene.add( mesh )

    #HAZE
    @haze = new FW.Haze()

    #Spectrum
    @spectrum = new FW.Spectrum()

   
  
  updatePulseGeo: ->
    for i in [0...@pulseGeo.vertices.length]
      if FW.freqByteData[i]
        fbd = @freqByteData[i]
        @pulseGeo.vertices[i].x = @pulseData.vertices[i].x * ( .5 + fbd/100 )
        @pulseGeo.vertices[i].y = @pulseData.vertices[i].y * ( .5 + fbd/100 )
        @pulseGeo.vertices[i].z = @pulseData.vertices[i].z * ( .5 + fbd/100 )
    @pulseGeo.verticesNeedUpdate = true

  onWindowResize : (event) ->
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  animate : =>
    FW.audio.update()
    @haze.update()
    @spectrum.update()
    @render()
    requestAnimationFrame @animate
  render : ->
    delta = FW.clock.getDelta()
    THREE.AnimationHandler.update(delta)
    @controls.update(delta)
    FW.Renderer.render( FW.scene, FW.camera );

