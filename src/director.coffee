FW.Director = class Director
  constructor: ->
    console.log 'hey'

  startShow: ->
    FW.freqMap =
      voiceStart: 100
      voiceEnd: 300
    FW.world = new FW.World()
    FW.world.animate()
