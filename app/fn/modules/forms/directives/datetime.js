/*global angular, WYMeditor, console, _*/

(function (angular) {

    'use strict';

    angular.module('fn.forms')

    // fn-forms-datetime
    //---------------------------------------------------------------------

    .constant('nytz', 'America/New_York')

    .directive('fnFormsDatetime', ['nytz', 'timezones', 'nameFromLabel', function(nytz, timezones, nameFromLabel) {

        var HOURS_LIST   = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var MINUTES_LIST = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14',
                            '15','16','17','18','19','20','21','22','23','24','25','26','27','28','29',
                            '30','31','32','33','34','35','36','37','38','39','40','41','42','43','44',
                            '45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];
        var AMPM_LIST    = ['AM','PM'];

        return {
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            scope: {
                label: "@",
                model: "=ngModel",
                validator: "@"
            },
            controller: ['$scope', function ($scope) {

                function clearFields() {
                    $scope.datestr = '';
                    $scope.hours = '';
                    $scope.minutes = '';
                    $scope.ampm = '';
                }

                $scope.setFieldSelections = function () {
                    var date, hours, minutes;
                    if (_.isEmpty($scope.model)) {
                        clearFields();
                        return null;
                    }

                    try {
                        date = new timezones.Date($scope.model, nytz);

                        hours = date.getHours();
                        hours = (hours > 12) ? (hours - 12) : hours;
                        hours = (hours < 10) ? '0' + hours : '' + hours;

                        minutes = date.getMinutes();
                        minutes = (minutes < 10) ? '0' + minutes : '' + minutes;

                        $scope.datestr = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/'); //date.toLocaleDateString();
                        $scope.hours = '' + hours;
                        $scope.minutes = '' + minutes;
                        $scope.ampm = (date.getHours() < 12) ? 'AM' : 'PM';
                    } catch (e) {
                        clearFields();
                    }
                };

                $scope.clear = function (event) {
                    $scope.model = '';
                    $scope.setFieldSelections();
                };

                $scope.now = function (event) {
                    $scope.model = (new Date()).toString();
                    $scope.setFieldSelections();
                };
            }],
            compile: function (tElement, tAttrs) {
                // Set the label before it goes to the directive.
                tElement.find('[fn-forms-jq-field="datepicker"]').attr('label', tElement.attr('label'));

                return {
                    pre: function (scope, iElement, iAttrs) {
                        scope.hours_list = HOURS_LIST;
                        scope.minutes_list = MINUTES_LIST;
                        scope.ampm_list = AMPM_LIST;
                    },
                    post: function (scope, iElement, iAttrs) {
                        scope.$on('updateScope', function () {
                            var date, result;

                            // Date and Hours are required, otherwise set nothing
                            if (_.isEmpty(scope.datestr) || _.isEmpty(scope.hours)) {
                                scope.model = null;
                                return;
                            }

                            // If Minutes were empty just use '00'
                            if (_.isEmpty(scope.minutes)) {
                                scope.minutes = '00';
                            }

                            // If AM/PM was empty just use AM
                            if (_.isEmpty(scope.ampm)) {
                                scope.ampm = 'AM';
                            }

                            try {
                                date = new timezones.Date(scope.datestr, nytz);
                                date.setHours((+scope.hours||0) + ((scope.ampm==='AM')?0:12));
                                date.setMinutes(+scope.minutes||0);
                                date.setSeconds(0);
                                date.setMilliseconds(0);

                                result = date.toISOString();
                                scope.model = result;
                            } catch (e) {
                                scope.model = null;
                            }
                        });
                        scope.$on('populate', function () {
                            scope.$apply(scope.setFieldSelections);
                        });
                    }
                };
            },
            template: '<span>' +
                          '<span fn-forms-jq-field="datepicker" fn-forms-validate="date" ng-model="datestr"></span> ' +
                          '<select class="dp-hours" name="inHours{{name}}" ng-model="hours" ng-options="n for n in hours_list"></select>:' +
                          '<select class="dp-mins" name="inMinutes{{name}}" ng-model="minutes" ng-options="n for n in minutes_list"></select>' +
                          '<select class="dp-ampm" name="inAmPm{{name}}" ng-model="ampm" ng-options="n for n in ampm_list"></select>' +
                          '<button class="btn" ng-click="now()">Now</button>' +
                          '<button class="btn btn-warning" ng-click="clear()">Clear</button>' +
                      '</span>'
        };
    }]);

})(angular);
