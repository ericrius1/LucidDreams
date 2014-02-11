FW.Haze = class Haze
  constructor: ->
    @numEmitters = 1024
    @hazeEmitters = []
    @curXPos = -500


    texture = THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    @hazeGroup = new ShaderParticleGroup
      texture: texture
      maxAge: 1
      # blending: THREE.NormalBlending

    @initializeHaze()
    FW.scene.add(@hazeGroup.mesh)
  initializeHaze: ->
    for i in [0...@numEmitters]
      colorStart = new THREE.Color()
      colorStart.setRGB Math.random(), Math.random(), Math.random()
      hazeEmitter = new ShaderParticleEmitter
        position: new THREE.Vector3(@curXPos, 0 , -50)
        colorStart: colorStart
        colorEnd: colorStart
        particlesPerSecond: 1
        opacityStart: 1
        opacityEnd: 1

      @hazeGroup.addEmitter hazeEmitter
      hazeEmitter.disable()
      @hazeEmitters.push hazeEmitter
      @curXPos+=1


  update: ->
    @hazeGroup.tick()

