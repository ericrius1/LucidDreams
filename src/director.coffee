FW.Director = class Director
  constructor: ->
    @shiftVoiceTime = 10000

  startShow: ->
    @startTime = Date.now()
    FW.freqMap =
      voiceStart: 400
      voiceEnd: 600

    FW.world = new FW.World()
    @run()


  run: =>
    requestAnimationFrame @run
    FW.audio.update()
    FW.world.animate()

    FW.freqMap.voiceStart+=.01

