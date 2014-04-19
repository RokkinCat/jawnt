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
  $scope.map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'osm'})
      })
    ],
    view: new ol.View2D({
      center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
      zoom: 4
    })
  });
})
