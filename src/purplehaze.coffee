FW.Haze = class Haze
  constructor: ->
    @voiceGroup = new SPE.Group
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
      maxAge: 1
    @emitters = []
    @createVoiceCloud()

  createVoiceCloud: ->
    for x in [0...1024]
        color = new THREE.Color()
        color.setRGB rnd(0.8, 1), rnd(0, 0.2), rnd(0.8, 1.0)
        emitter = new SPE.Emitter
          position: new THREE.Vector3 rnd(-10, 10), rnd(-10, 10), rnd(-20, -60)
          opacityStart: 1
          particleCount: 100
          positionSpread: new THREE.Vector3 .2, .2, .2
          colorStart: color
        @voiceGroup.addEmitter emitter
        @emitters.push emitter
        emitter.disable()
        FW.scene.add @voiceGroup.mesh

  update: ->
    for i in [0...FW.freqByteData.length]
      if FW.freqByteData[i]
        fbd = FW.freqByteData[i]
        if fbd > 150
          @emitters[i]?.enable()
        else 
          @emitters[i]?.disable()
    @voiceGroup.tick()


