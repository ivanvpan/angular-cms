/*global angular*/

(function (angular) {

    'use strict';
    
    angular.module('events', ['fn.base.filters','fn.base.directives','fn.forms'])

    .controller('EventController', ['$scope', 'EventCollection', '$rootScope', function ($scope, EventCollection, $rootScope) {
        $rootScope.activeSection = 'Events';
        $scope.collection = EventCollection;
        $scope.currentEvent = 1;
        $scope.numEvents = 0;
        $scope.data = [];
        $scope.searchParams = {
            'sort[start]': -1
        };
        $scope.buttons = [{
            href: '#/events/event/create',
            label: 'Create Event'
        }];
    }])

    .controller('EventCreateController', ['$scope', '$routeParams', 'EventItem', '$rootScope', function ($scope, $routeParams, EventItem, $rootScope) {
        $rootScope.activeSection = 'Events';
        $scope.homePath = '/events';
        $scope.docId = $routeParams.id;
        $scope.service = EventItem;
        $scope.readParams = {
            id: $routeParams.id
        };
    }])

    .controller('EventEditController', ['$scope', '$routeParams', 'EventItem', '$rootScope', function ($scope, $routeParams, EventItem, $rootScope) {
        $rootScope.activeSection = 'Events';
        $scope.homePath = '/events';
        $scope.docId = $routeParams.id;
        $scope.service = EventItem;
        $scope.readParams = {
            id: $routeParams.id
        };
        $scope.type_list = {
            'festival': 'Festival',
            'concert': 'Concert'
        };
    }])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/events', {
        	templateUrl: fuse.base + '/events/partials/list.html',
        	controller: 'EventController'
        });
        $routeProvider.when('/events/event/create', {
        	templateUrl: fuse.base + '/events/partials/create.html',
        	controller: 'EventCreateController'
        });
        $routeProvider.when('/events/event/:id', {
        	templateUrl: fuse.base + '/events/partials/edit.html',
        	controller: 'EventEditController'
        });
    }]);

})(angular);

