/* global juke */
juke.factory('StatsFactory', function ($q, $log) {
  var statsObj = {}
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio')
    return $q(function (resolve, reject) {
      var sum = 0
      var n = 0
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum)
        else audio.src = album.songs[n++].audioUrl
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration
        resolveOrRecur()
      })
      resolveOrRecur()
    })
  }
  statsObj.setImageUrl = function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image'
    return album
  }
  statsObj.setSongUrls = function (album) {
    album.songs.forEach(song => {
      song.audioUrl = '/api/songs/' + song.id + '/audio'
      return song
    })
    return album
  }
  return statsObj
})

juke.factory('AlbumFactory', function ($http, $log, StatsFactory) {
  function fetchAll () {
    return $http.get('/api/albums/')
      .then(res => res.data)
      .then(albums => albums.forEach(StatsFactory.setImageUrl))
      .catch($log.error)
  }
  function fetchById (id) {
    return $http.get('/api/albums/' + id)
      .then(res => res.data)
      .then(StatsFactory.setImageUrl)
      .then(StatsFactory.setSongUrls)
      .catch($log.error)
  }

  return {fetchAll, fetchById}
})
