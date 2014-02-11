FW.Haze = class Haze
  constructor: ->
    @hazeGroup = new SPE.Group
      texture: THREE.ImageUtils.loadTexture('assets/bullet.png')
      maxAge: 1
    @createGrid()

  createGrid: ->
    for x in [0..1]
      for y in [0..1]
        emitter = new SPE.Emitter
          position: new THREE.Vector3 x, y, -50
        @hazeGroup.addEmitter emitter
        FW.scene.add @hazeGroup.mesh

  update: ->
    @hazeGroup.tick()

