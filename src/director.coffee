FW.Director = class Director
  constructor: ->
    console.log 'hey'

  startShow: ->
    FW.world = new FW.World()
    FW.world.animate()
