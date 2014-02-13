var Audio;

FW.Audio = Audio = (function() {
  function Audio() {
    this.musicContext = new webkitAudioContext();
    this.masterGain = this.musicContext.createGain();
    this.masterAnalyser = this.musicContext.createAnalyser();
    this.masterAnalyser.frequencyBinCount = 1024;
    this.masterGain.connect(this.masterAnalyser);
    this.masterAnalyser.connect(this.musicContext.destination);
    this.loadFile('assets/GreatestSpeech2.mp3');
  }

  Audio.prototype.loadFile = function(filePath) {
    var request,
      _this = this;
    request = new XMLHttpRequest();
    request.open('GET', filePath, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
      return _this.musicContext.decodeAudioData(request.response, function(buffer) {
        if (!buffer) {
          alert('error decoding file data!');
          return;
        }
        _this.buffer = buffer;
        _this.createSource();
        return _this.play();
      });
    };
    return request.send();
  };

  Audio.prototype.createSource = function() {
    this.source = this.musicContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.loop = false;
    this.analyser = this.musicContext.createAnalyser();
    this.gain = this.musicContext.createGain();
    this.source.connect(this.gain);
    this.gain.connect(this.analyser);
    return this.analyser.connect(this.masterGain);
  };

  Audio.prototype.play = function() {
    if (soundOn) {
      this.source.noteOn(0);
    }
    return FW.director.startShow();
  };

  return Audio;

})();
