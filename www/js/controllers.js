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
    if($scope.recording) addPointToCurrentPath(coords.longitude, coords.latitude);
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

  var getPathObject = function() {
    return _.find($scope.geoJSON["object"]["features"], function(feature) {
      return feature["properties"] !== null && feature["properties"]["type"] === "path";
    });
  }

  var startNewPath = function() {
    var pathObject = getPathObject();
    pathObject["geometry"]["coordinates"].push([])
    addPointToCurrentPath($scope.longitude, $scope.latitude);
  }

  var addPointToCurrentPath = function(longitude, latitude) {
    var pathObject = getPathObject();
    var currentPath = _.last(pathObject["geometry"]["coordinates"]);
    currentPath.push([longitude, latitude])
  }

  // Fill in proper GeoJSON object here
  $scope.geoJSON = {};

  $scope.style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 30
    })});

  $scope.record = function() {
    $scope.geoJSON = {
      "object": {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [$scope.longitude, $scope.latitude],
          },
          "properties": null
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "MultiLineString",
            "coordinates": []
          },
          "properties": {
            "type": "path"
          }
        }]
      }
    }
    $scope.recording = true;
    $scope.paused = false;
    startNewPath();

    setTimeout(function() {
      $scope.$apply(function() {
        addPointToCurrentPath($scope.longitude + .25, $scope.latitude);
        console.log(JSON.stringify($scope.geoJSON["object"]))
      });
    }, 50);
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
