/*global angular*/

(function (angular) {

    'use strict';
    angular.module('fn.base.services')
        .directive('fnNotify', ['$rootScope', function($rootScope) {
            return {
                restrict: 'A',
                replace: true,
                link: function(scope, element) {
                    $rootScope.$on('notify', function(event, message) {
                        var type;
                        if (message.type == 'error') {
                            type = 'danger';
                        } else {
                            type = 'success';
                        }
                        element.notify({
                            message: {
                                text: message.text
                            },
                            type: type
                        }).show();
                    });
                },
                template: '<div class="notifications" style="position:fixed; top:50px; right:150px"></div>'
            };
        }]);
})(angular);
