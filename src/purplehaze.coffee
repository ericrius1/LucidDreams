FW.Haze = class Haze
  constructor: ->
    #We want to have n arbitrary number of emitters which are spread out equally among specified 
    #frequency ranges
    @numEmitters = 1000
    @voiceGroup = new SPE.Group
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
      maxAge: 0.1
    @emitters = []
    @createVoiceCloud()
    @metaTotal = 0

  createVoiceCloud: ->
    for x in [0...@numEmitters]
        color = new THREE.Color()
        color.setRGB rnd(0.6, 1), rnd(0, 0.4), rnd(0.6, 1.0)
        emitter = new SPE.Emitter
          position: new THREE.Vector3 rnd(-3, 3), rnd(-4, 4), rnd(-30, -50)
          opacityStart: 1
          colorStart: color
          opacityEnd: 0.0
          opacityStart: 0
          opacityMiddle: 1
          particleCount: 50
        @voiceGroup.addEmitter emitter
        @emitters.push emitter
        emitter.disable()
        FW.scene.add @voiceGroup.mesh

  update: ->
    #We want to go through relevent part of freqByteData and map those values to our voice emitters
    start = Math.round(FW.freqMap.voiceStart)
    end = Math.round(FW.freqMap.voiceEnd)

    #Go through and disable all emitters
    for emitter in @emitters
      emitter.disable()
    #We want to activate a proportional amount of voice emitters based on how powerful is his voice is..
    #so go through, add up all voice data within freq range, then enable proportional amount of 
    #voice emitters
    totalFbd = 0
    for i in [start...end]
      if FW.freqByteData[i]
        totalFbd += FW.freqByteData[i]

    #now go through and enable proportinal amount of voice emitters
    activationFraction = map(totalFbd, 0, 5000, 0, 1)
    for emitter in @emitters
      if Math.random() < activationFraction
        emitter.enable()
    @voiceGroup.tick()


