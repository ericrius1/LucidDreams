
FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    @camFar = 200
    FW.audio.masterGain.value = 1

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(45.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.z = -100
    
    #CONTROLS
    @controls = new THREE.OrbitControls(FW.camera)

    # SCENE 
    FW.scene = new THREE.Scene()

    @initSceneObjects()



    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer()
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement

    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false

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
    @pulseGeo  = new THREE.IcosahedronGeometry(10 , 2 );
    @pulseData = @pulseGeo.clone();


    for i in [0..5]
      mesh = new THREE.Mesh( @pulseGeo , material )
      mesh.position.z = -16
      mesh.rotation.z = (i / 20) * Math.PI * 2
      FW.scene.add( mesh )

  updateAudio: ->
    @freqByteData = new Uint8Array(FW.audio.masterAnalyser.frequencyBinCount)
    FW.audio.masterAnalyser.getByteFrequencyData(@freqByteData)
  
  updatePulseGeo :->
    for i in [0...@pulseGeo.vertices.length]
      if @freqByteData[i]
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
    @updateAudio()
    @updatePulseGeo()
    @controls.update()
    @render()
    requestAnimationFrame @animate
  render : ->
    FW.Renderer.render( FW.scene, FW.camera );

