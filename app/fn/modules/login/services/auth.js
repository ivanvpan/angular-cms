angular.module('fn.login.services.auth', [])
    .value('Urls', {
            login: '/nglogin',
            logout: '/nglogout',
            userInfo: '/nguserinfo'
    })
    .factory('Auth', ['$rootScope', '$injector', '$http', 'RetryQueue', 'Urls', function($rootScope, $injector, $http, queue, Urls) {
        var auth =  {
            user: {},
            isLoginRequired: false,
            login: function(email, password) {
                $http.post(Urls.login, {email: email, password: password, bypass: true}).then(function (response) {
                    auth.fetchUser();
                    $rootScope.$broadcast('auth:loggedIn');
                },
                function(response) {
                    $rootScope.$broadcast('auth:loginFailed');
                });
            },
            logout: function() {
                $http.post(Urls.logout).then(function (response) {
                    $rootScope.$broadcast('auth:loggedOut');
                    auth.user = {};
                    console.log('logged out');
                });
            },
            loginRequired: function(reason) {
                $rootScope.$broadcast('auth:loginRequired', reason);
            },
            fetchUser: function() {
                $http.get(Urls.userInfo).then(function (response) {
                    auth.user = response.data;
                    queue.retry();
                });
            },
            isLoggedIn: function() {
                return auth.user._id;
            },
            getUser: function() {
                return auth.user;
            }
        };
        return auth;
    }])

    .factory('RetryQueue', ['$q', '$injector', function ($q, $injector) {
        var queue = [],
            $http; //prevent circular dependency

        return {
            enqueue: function (request) {
                var deferrer = $q.defer();
                var item = {
                    retry: function () {
                        $http = $http || $injector.get('$http');
                        $http(request).then(function(response) {
                            deferrer.resolve(response);
                        });
                    }
                };
                queue.push(item);
                return deferrer.promise;
            },
            hasMore: function() {
                return queue.length > 0;
            },
            retry: function() {
                while (queue.length > 0) {
                    queue.shift().retry();
                }
            }
        };
    }])

    .factory('AuthInterceptor', ['$rootScope', '$q', 'RetryQueue', 'Urls', function($rootScope, $q, queue, Urls) {
        return function (promise) {
            return promise.then(null, function (response) {
                if (response.config.url != Urls.login) {
                    if (response.status === 401) {
                        console.log('not authenticated');
                        $rootScope.$broadcast('auth:loginRequired', 'not-authenticated');
                        return queue.enqueue(response.config);
                    } else if (response.status === 403) {
                        console.log('not authorized');
                    }
                }
                return promise;
            });
        };
    }])

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.responseInterceptors.push('AuthInterceptor');
    }])

    .run(['Auth', function(auth) {
        _.delay(function() {
            auth.fetchUser();
        }, 500);
    }]);
