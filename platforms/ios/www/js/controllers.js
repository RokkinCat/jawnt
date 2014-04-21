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
    return _.findWhere($scope.geoJSON["object"]["features"], {"id": "path"});
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
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:3857"
          }
        },
        "features": [{
          "type": "Feature",
          "id": "start",
          "geometry": {
            "type": "Point",
            "coordinates": [$scope.longitude, $scope.latitude],
          },
          "properties": {}
        },
        {
          "type": "Feature",
          "id": "path",
          "geometry": {
            "type": "MultiLineString",
            "coordinates": []
          },
          "properties": {}
        }]
      }
    }
    $scope.recording = true;
    $scope.paused = false;
    startNewPath();

    setTimeout(function() {
      $scope.$apply(function() {
        addPointToCurrentPath($scope.longitude + .25, $scope.latitude);
        console.log(JSON.stringify($scope.geoJSON))
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

  $scope.geoJSON = ({
      object: {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:3857'
          }
        },
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [[4e6, -2e6], [8e6, 2e6]]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [[4e6, 2e6], [8e6, -2e6]]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-5e6, -1e6], [-4e6, 1e6], [-3e6, -1e6]]]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'MultiLineString',
              'coordinates': [
                [[-1e6, -7.5e5], [-1e6, 7.5e5]],
                [[1e6, -7.5e5], [1e6, 7.5e5]],
                [[-7.5e5, -1e6], [7.5e5, -1e6]],
                [[-7.5e5, 1e6], [7.5e5, 1e6]]
              ]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [[[-5e6, 6e6], [-5e6, 8e6], [-3e6, 8e6], [-3e6, 6e6]]],
                [[[-2e6, 6e6], [-2e6, 8e6], [0e6, 8e6], [0e6, 6e6]]],
                [[[1e6, 6e6], [1e6, 8e6], [3e6, 8e6], [3e6, 6e6]]]
              ]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'GeometryCollection',
              'geometries': [
                {
                  'type': 'LineString',
                  'coordinates': [[-5e6, -5e6], [0e6, -5e6]]
                },
                {
                  'type': 'Point',
                  'coordinates': [4e6, -5e6]
                },
                {
                  'type': 'Polygon',
                  'coordinates': [[[1e6, -6e6], [2e6, -4e6], [3e6, -6e6]]]
                }
              ]
            }
          }
        ]
      }
    })
})
