angular.module('openstreetmaps', [])
.directive('ionMap', function() {
  return {
    restrict: 'A',
    scope: {
      controls: "=controls",
      longitude: "=longitude",
      latitude: "=latitude",
      zoom: "@zoom",
      geoJSON: "=geoJson",
      geoStyle: "=geoJsonStyle"
    },
    link: function($scope, element) {
      $scope.map = new ol.Map({
        target: element[0],
        controls: $scope.controls || [],
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
          })
        ],
        view: new ol.View2D({
          center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
          zoom: $scope.zoom
        })
      });

      var markerElement = angular.element(document.createElement('span'))
      markerElement.addClass("icon").addClass("ion-ios7-circle-filled").addClass("map-marker").css("color","#4a87ee").css("font-size", "2em");

      $scope.markers = new ol.Overlay({
        positioning: 'center-center',
        element: markerElement,
        stopEvent: false
      });
      $scope.map.addOverlay($scope.markers);

      $scope.map.getView().setCenter(ol.proj.transform([-0.12755, 51.507222], 'EPSG:4326', 'EPSG:3857'));
      $scope.$watchCollection("[longitude, latitude]", function() {
        if($scope.longitude !== undefined && $scope.latitude !== undefined) {
          $scope.map.getView().setCenter(ol.proj.transform([$scope.longitude, $scope.latitude], 'EPSG:4326', 'EPSG:3857'))
          $scope.map.getView().setZoom($scope.zoom);
          $scope.markers.setPosition($scope.map.getView().getCenter());
        }
      });

      // This may not be performant enough
      $scope.$watch("geoJSON", function(json) {
        if(_.isEmpty(json)) return;
        var o = $scope.geoJSONLayer;

        $scope.geoJSONLayer = new ol.layer.Vector({
          source: new ol.source.GeoJSON({
            projection: 'EPSG:3857',
            text: json
          }),
          style: $scope.geoStyle
        });
        if(o) $scope.map.removeLayer(o);
        $scope.map.addLayer($scope.geoJSONLayer);
      }, true);

      $scope.map.on('moveend', function(event) {
        $scope.$apply(function() {
          $scope.zoom = event.map.getView().getZoom();
        })
      })
    }
  }
});
