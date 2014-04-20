angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SearchCtrl', function($scope, $stateParams) {
})

.controller('CreateCtrl', function($scope, $stateParams) {
  $scope.locating = true;
  $scope.recording = false;

  var updatePosition = function(coords) {
    $scope.longitude = coords.longitude;
    $scope.latitude = coords.latitude;
  }

  // Subscribe to user position
  if (navigator.geolocation) {
    $scope.locationObserver = navigator.geolocation.watchPosition(function(position) {
      $scope.$apply(function() {
        updatePosition(position.coords);
        $scope.locating = false;
      })
    });
  }

  $scope.record = function() {
    $scope.recording = true;
    $scope.paused = false;
  }

  $scope.stop = function() {
    $scope.recording = false;
  }

  $scope.pause = function() {
    $scope.paused = true;
  }

  $scope.play = function() {
    $scope.paused = false;
  }

})
