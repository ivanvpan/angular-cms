/*global angular*/

(function (angular) {

    'use strict';

    var ENTER = 13;

    angular.module('fn.base.directives')

    .directive('fnBaseSearchbar', function () {
        return {
            restrict: 'A',
            templateUrl: fuse.base + '/fn/modules/base/partials/searchbar.html',
            replace: true,
            scope: {
                collection: '=',
                currentPage: '=',
                resource: '@',
                numPages: '=',
                buttons: '=',
                data: '=ngModel',
                //createButtonLabel: '@',
                params: '=params'
            },
            controller: ['$scope', '$attrs', '$rootScope', function ($scope, $attrs, $rootScope) {
                $scope.query = '';
                $scope.cache = '';
                console.log('resource', $attrs.resource);
                if (!$rootScope.params) {
                    $rootScope.params = {};
                }
                if (!$rootScope[$attrs.resource]) {
                    $rootScope[$attrs.resource] = {};
                }

                if ($rootScope[$attrs.resource].query) {
                    $scope.query = $rootScope[$attrs.resource].query;
                }
                if ($rootScope[$attrs.resource].cache) {
                    $scope.cache = $rootScope[$attrs.resource].cache;
                }
                if ($rootScope[$attrs.resource].currentPage) {
                    $scope.currentPage = $rootScope[$attrs.resource].currentPage;
                }
                if ($rootScope[$attrs.resource].numPages) {
                    $scope.numPages = $rootScope[$attrs.resource].numPages;
                }

                $scope.search = function () {
                    if ($scope.query != $scope.cache) {
                        $scope.currentPage = 1;
                        $scope.cache = $scope.query;
                    }

                    var searchField = $attrs.searchField || 'title';
                    var params = {
                        page: $scope.currentPage
                    };
                    
                    if ($scope.params) {
                        params = _.extend(params, $scope.params);
                    }
                    if ($scope.query) {
                        params[searchField] = $scope.query;
                    }

                    function callback(data, other, last) {
                        if ($scope.numPages !== data.numPages) {
                            $scope.numPages = data.numPages;
                        }
                        $scope.data = data;
                        
                        $rootScope[$attrs.resource] = {};
                        $rootScope[$attrs.resource].numPages = $scope.numPages;
                        $rootScope[$attrs.resource].currentPage = $scope.currentPage;
                        $rootScope[$attrs.resource].query = $scope.query;
                        $rootScope[$attrs.resource].cache = $scope.query;
                    }

                    $scope.collection.list(params, callback);
                };

                $scope.$watch('currentPage', $scope.search);
            }],
            link: function (scope, tElement, tAttrs) {

                // There shouldn't be a button if the button doesn't have a label.
                if (typeof tAttrs.createButtonLabel === 'undefined') {
                    tElement.find('.create-btn').remove();
                }

                // Submit the form when the user clicks the ENTER key.
                var input = tElement.find('.search-query');
                input.on('keyup', function (event) {
                    if (event.keyCode === ENTER) {
                        scope.search();
                        /*
                        if (scope.currentPage === 1) {
                            // manually search
                            scope.search();
                        } else {
                            // setting the page number will trigger a search
                            // even if the value is already 1.
                            scope.currentPage = 1;
                        }
                        */
                    }
                });
            }
        };
    });

})(angular);

