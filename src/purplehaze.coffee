FW.Haze = class Haze
  constructor: ->
    @hazeGroup = new SPE.Group
      texture: THREE.ImageUtils.loadTexture('assets/bullet.png')
      maxAge: 1
    @emitters = []
    @createGrid()

  createGrid: ->
    for x in [-16..16]
      for y in [-16..16]
        emitter = new SPE.Emitter
          position: new THREE.Vector3 x, y, -50
        @hazeGroup.addEmitter emitter
        @emitters.push emitter
        emitter.disable()
        FW.scene.add @hazeGroup.mesh

  update: ->
    for i in [0...FW.freqByteData.length]
      if FW.freqByteData[i]
        fbd = FW.freqByteData[i]
        if fbd > 50
          @emitters[i].enable()
        else 
          @emitters[i].disable()
    @hazeGroup.tick()


