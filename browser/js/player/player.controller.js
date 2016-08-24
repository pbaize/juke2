/* global juke */
'use strict'

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {
  PlayerFactory.audio.addEventListener('timeupdate', function () {
    $scope.progress = PlayerFactory.getProgress() * 100
    $scope.$evalAsync()
  })

  $scope.loaded = function () {
    return Boolean(PlayerFactory.getCurrentSong())
  }

  $scope.playing = PlayerFactory.isPlaying

  // main toggle
  $scope.toggle = function () {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause()
    else PlayerFactory.resume()
  }

  $scope.next = function () {
    PlayerFactory.next()
  }

  $scope.prev = function () {
    PlayerFactory.previous()
  }

  $scope.handleProgressClick = function (evt) {
    PlayerFactory.seek(evt.offsetX / evt.currentTarget.scrollWidth)
  }
})
