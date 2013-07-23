angular.module('fn.login', ['fn.login.services.auth'])
    .run(['$rootScope', 'Auth', function($rootScope, auth) {
        $rootScope.auth = auth;
    }])
    .directive('fnLoginModal', ['Auth',  function(auth) {
        var d = {
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.authError = '';
                $scope.user = {};

                $scope.close = function() {
                    $scope.clearForm();
                    $scope.hideModal();
                };

                $scope.hideModal = function () {
                    angular.element($element).modal('hide');
                };

                $scope.showModal = function ($event) {
                    if ($event) {
                        $event.preventDefault();
                    }
                    angular.element($element).modal('show');
                };
                
                $scope.hideModal();

                $scope.login = function() {
                    auth.login($scope.user.email, $scope.user.password);
                };

                $scope.clearForm = function() {
                    $scope.user.email = '';
                    $scope.user.password = '';
                    $scope.authError = '';
                };

                $scope.$on('auth:loginFailed', function(event) {
                    $scope.authError = 'The email and password combination is incorrect';
                });

                $scope.$on('auth:loginRequired', function(event) {
                    $scope.showModal();
                });

                $scope.$on('auth:loggedIn', function(event) {
                    $scope.clearForm();
                    $scope.hideModal();
                });
            }],
            templateUrl: fuse.base + '/fn/modules/login/partials/modal.html',
            restrict: 'A',
            replace: true,
            scope: false
        };
        return d;
    }])
    .directive('fnLoginToolbar', ['Auth', function(auth) {
        var d = {
            templateUrl: fuse.base + '/fn/modules/login/partials/toolbar.html',
            restrict: 'A',
            replace: true,
            scope: false,
            link: function($scope, $el, $attrs, $controller) {}
        };
        return d;
    }]);
