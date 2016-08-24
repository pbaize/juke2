'use strict'

juke.factory('PlayerFactory', function ($log) {

    var currentSong;
    var playing = false;
    var progress;

    var audio = document.createElement('audio')
      audio.addEventListener('ended', function () {
      next()
    });

    audio.addEventListener('timeupdate', function () {
      progress = 100 * audio.currentTime / audio.duration
    });


    function start(song) {

      if(currentSong) {
        this.pause()
      }

      audio.src = song.audioUrl;
      audio.load();
      audio.play();
      currentSong = song;
      playing = true;
    }

    function stop() {
      if(currentSong) {
        audio.pause();
      }
      return Promise.resolve();
    }

    function resume () {

    }

    function isPlaying() {

    }

    function getCurrentSong() {

    }

    function next() {

    }

    function previous() {

    }

    function pause() {
      audio.pause();
    }



    return {
      start,
      stop,
      resume,
      isPlaying,
      getCurrentSong,
      next,
      previous,
      audio
    }

})
