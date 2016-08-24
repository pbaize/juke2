/* global juke */
'use strict'

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, AlbumFactory, PlayerFactory) {
  // load our initial data
  AlbumFactory.fetchById(57)
    .then(function (album) {
      $scope.album = album
    })
    .catch($log.error) // $log service can be turned on and off; also, pre-bound

  $scope.isActive = song => song === PlayerFactory.getCurrentSong()
  $scope.isPlaying = song => PlayerFactory.isPlaying() && $scope.isActive(song)
  // main toggle
  $scope.toggle = function (song) {
    if ($scope.isPlaying(song)) {
      PlayerFactory.pause()
    } else {
      PlayerFactory.start(song, $scope.album.songs)
    }
  }

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m }

// // jump `interval` spots in album (negative to go back, default +1)
// function skip (interval) {
//   if (!$scope.currentSong) return
//   var index = $scope.currentSong.albumIndex
//   index = mod((index + (interval || 1)), $scope.album.songs.length)
//   $scope.currentSong = $scope.album.songs[index]
//   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong)
// }
// function next () { skip(1) }
// function prev () { skip(-1) }
})

juke.controller('AlbumsCtrl', function ($scope, AlbumFactory, $log) {
  AlbumFactory.fetchAll()
    .then(function (albums) {
      $scope.albums = albums
    })
    .catch($log.error)
})
