angular.module('fn.login.services.permissions', [])
    .factory('Permissions', ['$rootScope', '$http', function($rootScope, $http) {
        var permissions = {
            initialize: function() {
                $rootScope.$on('auth:loggedIn', _.bind(this.load, this));
                $rootScope.$on('auth:loginRequired', _.bind(this.unload, this));
                $rootScope.$on('auth:loggedOut', _.bind(this.unload, this));
                this.load();
            },
            userPerms: {},
            load: function () {
                var self = this;
                $http.get('/nguserperms').then(function (response) {
                    _.each(response.data, function(item) {
                        self.userPerms[item] = true;
                    });
                });
            },
            unload: function () {
                var self = this;
                _.each(this.userPerms, function(val, key) {
                    delete self.userPerms[key];
                });
            },
            hasPerm: function (perm) {
                return _.indexOf(this.userPerms, perm) > -1;
            }
        };
        permissions.initialize();
        return permissions;
    }]);
