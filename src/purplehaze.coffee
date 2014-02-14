FW.Haze = class Haze
  constructor: ->
    #We want to have n arbitrary number of emitters which are spread out equally among specified 
    #frequency ranges
    @numEmitters = 1000
    @voiceGroup = new SPE.Group
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
      maxAge: 0.5
    @emitters = []
    @createVoiceCloud()

  createVoiceCloud: ->
    for x in [0...@numEmitters]
        color = new THREE.Color()
        color.setRGB rnd(0.6, 1), rnd(0, 0.4), rnd(0.6, 1.0)
        emitter = new SPE.Emitter
          position: new THREE.Vector3 rnd(-10, 10), rnd(-10, 10), rnd(-10, -60)
          opacityStart: 1
          particleCount: 50
          positionSpread: new THREE.Vector3 .1, .1, .1
          colorStart: color
          opacityEnd: 0.0
        @voiceGroup.addEmitter emitter
        @emitters.push emitter
        emitter.disable()
        FW.scene.add @voiceGroup.mesh

  update: ->
    #We want to go through relevent part of freqByteData and map those values to our voice emitters
    for i in [FW.freqMap.voiceStart..FW.freqMap.voiceEnd]
      if FW.freqByteData[i]
        fbd = FW.freqByteData[i]
        emitterIndex = Math.floor(map(i, FW.freqMap.voiceStart, FW.freqMap.voiceEnd, 0, @numEmitters-1))
        if fbd > 5
          @emitters[emitterIndex].enable()
        else
          @emitters[emitterIndex].disable()

    @voiceGroup.tick()


