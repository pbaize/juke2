'use strict'

juke.factory('PlayerFactory', function ($log, $rootScope) {
  var playing = false
  var songDeck = null
  var currentSong = null
  var deckInd
  var progress = 0
  var audio = document.createElement('audio')

  audio.addEventListener('ended', function () {
    next()
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $rootScope.$evalAsync() // likely best, schedules digest if none happening
  })
  // // audio.addEventListener('timeupdate', function () {
  // //   progress = audio.currentTime / audio.duration
  // //   // $scope.$digest(); // re-computes current template only (this scope)
  // //   $rootScope.$evalAsync() // likely best, schedules digest if none happening
  // // })

  function start (song, songlist) {
    if (currentSong) {
      this.pause()
    }
    songDeck = songlist
    deckInd = songlist ? songlist.indexOf(song) : 0
    audio.src = song.audioUrl
    audio.load()
    audio.play()
    currentSong = song
    playing = true
  }

  function stop () {}

  function resume () {
    audio.play()
    playing = true
  }

  function isPlaying () {
    return playing
  }

  function getCurrentSong () {
    return currentSong
  }

  function next () {
    if (deckInd === songDeck.length - 1) deckInd = -1
    this.start(songDeck[++deckInd], songDeck)
  }

  function previous () {
    if (deckInd === 0) deckInd = songDeck.length
    this.start(songDeck[--deckInd])
  }

  function pause () {
    audio.pause()
    playing = false
  }

  function getProgress () {
    return currentSong
      ? audio.currentTime / audio.duration
      : 0
  }

  return {
    start,
    stop,
    resume,
    isPlaying,
    getCurrentSong,
    next,
    previous,
    audio,
    getProgress,
  pause}
})
