/*global angular, _ */

(function (angular) {

    'use strict';

    angular.module('fn.forms')

    // fn-forms-resource-picker
    //---------------------------------------------------------------------

    .directive('fnFormsResourcePicker', function () {
        return {
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.currentPage = 1;
                $scope.numPages = 0;
                $scope.virgin = true;

                $element.css({
                    'margin-left': function () {
                        return -(angular.element(this).width() / 2);
                    }
                });
                    
                $scope.search = function () {
                    if (!$scope.virgin) {
                        var params = {
                                'and[title]': $scope.searchTerm || '',
                                page: $scope.currentPage,
                                limit: 12
                            },
                            transformedFilters = {};
                            
                        //console.log('search called', $scope.options);
                        if ($scope.options) {
                            _.each($scope.options, function(value, key) {
                                transformedFilters['and[' + key + ']'] = value;
                            });
                            _.extend(params, transformedFilters);
                        }
                        
                        $scope.ResourceCollection.list(params, function (response) {
                            $scope.items = response.results;
                            if (response.numPages != $scope.numPages) {
                                $scope.numPages = response.numPages;
                            }
                        });
                    }
                };

                $scope.$watch('searchTerm', function (newVal, oldVal) {
                    if (newVal != oldVal && (newVal.length === 0 || newVal.length >= 3)) {
                        $scope.currentPage = 1;
                        $scope.search();
                    }
                });


                $scope.hideModal = function () {
                    angular.element($element).modal('hide');
                };

                $scope.showModal = function ($event) {
                    if ($scope.virgin) {
                        $scope.virgin = false;
                        $scope.search();
                    }

                    $event.preventDefault();
                    angular.element($element).modal('show');
                };

                $scope.select = function (item, $event) {
                    $event.preventDefault();
                    $scope.selectedItem = item;
                };

                $scope.confirm = function ($event) {
                    $event.preventDefault();
                    if ($scope.selectedItem) {
                        $scope.resourceId = $scope.selectedItem._id;
                        $scope.hideModal();
                    }
                };

                $scope.$watch('currentPage', $scope.search);
            }],
            restrict: 'A',
            replace: true,
            template: '<div class="modal hide resource-picker" tabindex="-1" role="dialog">' +
                    '<div class="modal-header"><input type="text" class="search-query" ng-model="searchTerm"></input></div>' +
                    '<div class="modal-body">' +
                        '<ul class="thumbnails">' +
                            '<li class="thumbnail" ng-click="select(item, $event)" ng-class="{empty: (resourceName == \'Page\' && !item.image), selected: (item == selectedItem) }" ng-repeat="item in items">' +
                                '<a href="#">' +
                                    '<img ui-if="resourceName == \'Asset\'" alt="{{ item.title }}" ng-src="/image/{{ item._id }}/210/130/crop/thumb.jpg" width="210px" height="130px" />' +
                                    '<img ui-if="resourceName == \'Page\'" alt="{{ item.title }}" ng-src="/image/{{ item.image }}/210/130/crop/thumb.jpg" width="210px" height="130px" />' +
                                    '<div class="caption">{{item.title}}</div>' +
                                '</a>' +
                            '</li>' +
                        '</ul>' +
                        '<div fn-base-pagination current-page="currentPage" max-pages="numPages"></div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<button class="btn" data-dismiss="modal">Cancel</button>' +
                        '<button class="btn btn-primary" ng-disabled="!selectedItem" ng-click="confirm($event)">Select</button>' +
                    '</div>' +
                    '</div>'
        };
    })

    // fn-forms-resource-view
    //---------------------------------------------------------------------

    .directive('fnFormsResourceView', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            template: '<div class="input-container asset-field">' +
                            '<div ng-show="currentItem" class="thumbnail" ng-class="{empty: resourceName == \'Page\' && !currentItem.image}">' +
                                '<div ng-switch="resourceName">' +
                                    '<img ng-switch-when="Asset" ng-src="/image/{{ currentItem._id }}/210/130/crop/thumb.jpg"></img>'+
                                    '<img ng-switch-when="Page" ng-src="/image/{{ currentItem.image }}/210/130/crop/thumb.jpg"></img>'+
                                '</div>' +
                                '<div class="caption">{{ currentItem.title }}</div>' +
                            '</div>'+
                            '<div class="noitem" ng-show="!currentItem">No Image</div>' +
                            '<div class="btn-toolbar">' +
                                '<a href="" class="btn" ng-click="showModal($event)">Change</a>' +
                                '<a href="" class="btn" ng-click="resourceId = null">Reset</a>' +
                            '</div>'+
                        '</div>'
        };
    })

    // fn-forms-asset-input
    //---------------------------------------------------------------------

    .directive('fnFormsResourceInput', [function() {
        return {
            controller: ['$scope', '$http', '$injector', '$attrs', function($scope, $http, $injector, $attrs) {
                $scope.items = [];

                $scope.resourceName = $attrs.resourceName;
                $scope.ResourceItem = $injector.get($attrs.resourceName + 'Item');
                $scope.ResourceCollection = $injector.get($attrs.resourceName + 'Collection');

                $scope.$watch('resourceId', function (newVal, oldVal) {
                    if (newVal) {
                        $scope.ResourceItem.read(
                            {
                                id: newVal,
                                fields: '_id, title, image'
                            }, function (item) {
                            $scope.currentItem = item;
                        });
                    } else {
                        $scope.currentItem = undefined;
                    }
                });

            }],
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            scope: {
                label: "@",
                resourceName: "@",
                resourceId: "=ngModel",
                validator: "@",
                options: "=options"
            },
            link: function (scope, element, attrs, ctrl) {
                //scope.search();
            },
            template: '<div>' +
                          '<input type="hidden" ng-model="resourceId"></input>' + 
                          '<div fn-forms-resource-view></div>' +
                          '<div fn-forms-resource-picker></div>' +
                      '</div>'
        };
    }]);

})(angular);
