/*global angular*/

(function (angular) {

    'use strict';

    angular.module('fn.base.filters')

        .filter('active', function () {
            return function (input) {
                return (input && input !== "" && input !== "false") ? "Active" : "Inactive";
            };
        })

        .filter('activeClass', function () {
            return function (input) {
                return (input && input !== "" && input !== "false") ? "label-success" : "";
            };
        })

        .filter('activate', function () {
            return function (input) {
                return (input && input !== "" && input !== "false") ? "Deactivate" : "Activate";
            };
        });

})(angular);

