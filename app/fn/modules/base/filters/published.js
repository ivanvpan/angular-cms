/*global angular*/

(function (angular) {

    'use strict';

    angular.module('fn.base.filters')

    .filter('published', function () {
        return function (input) {
            return (input && input !== "" && input !== "false") ? "Published" : "Unpublished";
        };
    })

    .filter('publishedClass', function () {
        return function (input) {
            return (input && input !== "" && input !== "false") ? "label-success" : "";
        };
    });

})(angular);

