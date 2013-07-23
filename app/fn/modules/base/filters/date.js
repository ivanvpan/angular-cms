/*global angular*/

(function (angular) {

    'use strict';

    angular.module('fn.base.filters')

        .filter('easternDate', ['timezones', function (timezones) {
            return function (input) {
                if (input) {
                    return (new timezones.Date(input, 'America/New_York'));
                }
            };
        }])

        // takes a timezoneJS data
        .filter('stdDate', ['timezones', function (timezones) {
            return function (input, format) {
                if (input) {
                    return input.toString('EEE MMM dd, yyyy');
                }
            };
        }])

        .filter('stdDatetime', ['timezones', function (timezones) {
            return function (input) {
                if (input) {
                    return input.toString('EEE. MMM. dd, yyyy HH:mm Z');
                }
            };
        }]);

})(angular);

