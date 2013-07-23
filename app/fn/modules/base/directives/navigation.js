/*global angular, fuse*/

(function (angular) {

    'use strict';

    angular.module('fn.base.directives')

    .directive('fnBaseNavigation', function () {
        return {
            restrict: 'A',
            templateUrl: fuse.base + '/fn/modules/base/partials/navigation.html',
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                $scope.getClass = function (item) {
                    if (item.title === $rootScope.activeSection) {
                        return 'active';
                    } else {
                        return '';
                    }
                };
                $scope.links = [
                    {
                        title: 'Dashboard',
                        //route: fuse.base,
                        route: '#/dashboard',
                        className: ''
                    },
                    {
                        title: 'Pages',
                        //route: fuse.base + '/pages',
                        route: '#/pages',
                        className: ''
                    },
                    {
                        title: 'Assets',
                        //route: fuse.base + '/assets',
                        route: '#/assets',
                        className: ''
                    },
                    {
                        title: 'Tags',
                        //route: fuse.base + '/tags',
                        route: '#/tags',
                        className: ''
                    },
                    {
                        title: 'Collections',
                        //route: fuse.base + '/lists',
                        route: '#/lists',
                        className: ''
                    }
                ];
                $scope.drop = [
                    {
                        title: 'Contests',
                        //route: fuse.base + '/contests',
                        route: '#/contests',
                        className: ''
                    },
                    {
                        title: 'Trending 10',
                        //route: fuse.base + '/trending10',
                        route: '#/trending10',
                        className: ''
                    },
                    {
                        title: 'Contributors',
                        //route: fuse.base + '/contributors',
                        route: '#/contributors',
                        className: ''
                    },
                    {
                        title: 'Spotify',
                        //route: fuse.base + '/spotify',
                        route: '#/spotify',
                        className: ''
                    },
                    {
                        title: 'Festivals',
                        //route: fuse.base + '/festivals',
                        route: '#/festivals',
                        className: ''
                    },
                    {
                        title: 'Events',
                        //route: fuse.base + '/events',
                        route: '#/events',
                        className: ''
                    },
                    {
                        title: 'Venues',
                        //route: fuse.base + '/venues',
                        route: '#/venues',
                        className: ''
                    },
                    {
                        title: 'Fuse Foto',
                        //route: fuse.base + '/frames',
                        route: '#/frames',
                        className: ''
                    },
                    {
                        title: 'Shows',
                        //route: fuse.base + '/shows',
                        route: '#/shows',
                        className: ''
                    },
                    {
                        title: 'Polls',
                        //route: fuse.base + '/polls',
                        route: '#/polls',
                        className: ''
                    },
                    {
                        title: 'Ticker',
                        //route: fuse.base + '/ticker',
                        route: '#/ticker',
                        className: ''
                    },
                    {
                        title: 'Quizzes',
                        //route: fuse.base + '/quizzes',
                        route: '#/quizzes',
                        className: ''
                    }
                ];
            }],
            replace: true,
            link: function (scope, iElement, iAttrs) {
                //var active = iAttrs.selected;
                /*
                var active = $rootScope.selectedPage;
                console.log(active);
                for (var i in scope.links) {
                    if (scope.links[i].title === active) {
                        scope.links[i].className = 'active';
                        break;
                    }
                }
                for (var i in scope.drop) {
                    if (scope.drop[i].title === active) {
                        scope.drop[i].className = 'active';
                        break;
                    }
                }
                */
            }
        };
    });

})(angular);

