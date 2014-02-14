FW.Director = class Director
  constructor: ->
    console.log 'hey'

  startShow: ->
    FW.freqMap =
      voiceStart: 200
      voiceEnd: 1000
    FW.world = new FW.World()
    FW.world.animate()
