FW.Director = class Director
  constructor: ->
    @shiftVoiceTime = 20000

  startShow: ->
    @startTime = Date.now()
    FW.freqMap =
      voiceStart: 400
      voiceEnd: 800

    FW.world = new FW.World()
    @run()


  run: =>
    requestAnimationFrame @run
    FW.audio.update()
    FW.world.animate()

    if Date.now() > @startTime + @shiftVoiceTime
      FW.freqMap.voiceStart = 450
