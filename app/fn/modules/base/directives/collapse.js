/*global angular*/

(function (angular) {

    'use strict';

    angular.module('fn.base.directives')

    .directive('fnBaseCollapse', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                ref: '@targetSelector'
            },
            template: '<div class="well span3">' +
                '<button class="btn span2" ng-click="collapse()" style="margin-bottom:10px;">Collapse All</button>' +
                '<button class="btn span2" ng-click="show()">Show All</button>' +
                '</div>',
            controller: ['$scope', function ($scope) {
                function removeHiddenClass () {
                    $($scope.ref + ' .collapse').removeClass('no-transition');
                    $($scope.ref + ' .collapse').off('hidden', removeHiddenClass);
                }
                function removeShownClass () {
                    $($scope.ref + ' .collapse').removeClass('no-transition');
                    $($scope.ref + ' .collapse').off('shown', removeShownClass);
                }
                $scope.collapse = function () {
                    $($scope.ref + ' .collapse').addClass('no-transition').collapse('hide');
                    $($scope.ref + ' .collapse').on('hidden', removeHiddenClass);
                }
                $scope.show = function () {
                    $($scope.ref + ' .collapse').addClass('no-transition').collapse('show');
                    $($scope.ref + ' .collapse').on('shown', removeShownClass);
                }
            }]
        };
    });

})(angular);

