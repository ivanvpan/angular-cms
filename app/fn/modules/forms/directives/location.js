/*global angular, google, console*/

(function (angular) {

    'use strict';

    angular.module('fn.forms')

    // fn-forms-location
    //---------------------------------------------------------------------

    .directive('fnFormsLocation', function () {
        return {
            controller: ['$scope', function($scope) {
                $scope.findAddress =  function($event) {
                    $event.preventDefault();
                    $scope.canvas.gmap('search', {
                        address: $scope.address
                    }, function (result, status) {
                        if (status == 'OK' && result.length > 0) {
                            var location = result[0].geometry.location;
                            $scope.$apply(function() {
                                $scope.location = {
                                    latitude: location.lat(),
                                    longitude: location.lng()
                                };
                            });
                        }
                    });
                };
            }],
            restrict: 'A',
            replace: true,
            require: 'ngModel',
            scope: {
                location: "=ngModel"
            },
            link: function(scope, element, attrs, ctrl) {
                scope.canvas = element.find('.map-canvas');
                scope.init = function(location) {
                    if (location && location.latitude) {
                        var latlng = new google.maps.LatLng(location.latitude, location.longitude);
                        scope.canvas.gmap('clear', 'markers');
                        scope.canvas.gmap('addMarker', {
                            'position': latlng,
                            'bounds': false
                        });
                        scope.canvas.gmap('get', 'map').setCenter(latlng);
                        scope.canvas.gmap('get', 'map').setZoom(4);
                    }
                };
                scope.canvas.gmap({
                    'center': '38, -97',
                    'zoom': 4,
                    mapTypeControl: false
                }).bind('init', function (ev, map) {
                    scope.init(scope.location);
                    scope.$watch('location', scope.init);
                });
            },
            template: '<div>' +
                        '<div class="map-canvas" style="height:300px;width:460px;"></div>' +
                        '<div class="input-append" style="margin: 20px 0 ">' +
                            '<input type="text" class="address span4" ng-model="address" ui-keypress="{enter: \'findAddress($event)\'}"/>' +
                            '<a class="btn" ng-click="findAddress($event)">Update Location</a>' +
                        '</div>' +
                    '</div>'
        };
    });
})(angular);
