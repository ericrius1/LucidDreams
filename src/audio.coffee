
FW.Audio = class Audio
  constructor: ->

    @musicContext = new webkitAudioContext()
    @masterGain = @musicContext.createGain()
    @masterAnalyser = @musicContext.createAnalyser();

    #number of different parts of spectrum
    @masterAnalyser.frequencyBinCount = 1024

    @masterGain.connect @masterAnalyser
    @masterAnalyser.connect @musicContext.destination
    @loadFile('assets/LucidDreams.mp3')

  loadFile: (filePath)->
    request = new XMLHttpRequest();
    request.open 'GET', filePath, true
    request.responseType= "arraybuffer"
    request.onload = =>
      @musicContext.decodeAudioData request.response, (buffer)=>
        unless buffer
          alert('error decoding file data!')
          return
        @buffer = buffer
        @createSource()
        @play()
    request.send()

  createSource: ->
    @source = @musicContext.createBufferSource()
    @source.buffer = @buffer
    @source.loop = false
    @analyser = @musicContext.createAnalyser()
    @gain = @musicContext.createGain()
    @source.connect @gain
    @gain.connect @analyser
    @analyser.connect @masterGain


  play: ->
    if soundOn
      @source.noteOn(0)
    FW.director.startShow()


