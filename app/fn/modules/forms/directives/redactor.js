/*global angular, _ */

(function (angular) {

    'use strict';

    angular.module('fn.forms')

    // fn-forms-resource-picker
    //---------------------------------------------------------------------

    .directive('redactor', function () {
        return {
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.$on('populate', function () {
                    $element.redactor('set', $scope.model);
                });
                $scope.$on('updateScope', function () {
                    $scope.model = $element.redactor('get');
                    console.log($element.redactor('get'));
                });
            }],
            link: function (scope, element, attr) {
                $(element).redactor({
                    minHeight: 150,
                    wym: true,
                    formattingTags: ['p', 'blockquote', 'h2', 'h3'],
                    buttons: ['formatting', '|', 'bold', 'italic', 'deleted', '|',
                        'unorderedlist', 'orderedlist', 'outdent', 'indent', '|',
                         'link', '|', 'alignment', '|', 'horizontalrule']
                });
                $(element).redactor('set', scope.model || '');
                element.on('$destroy', function () {
                    //console.log('destroying redactor');
                    $(element).redactor('set', '');
                    $(element).redactor('destroy');
                    element.off('$destroy');
                });
            },
            restrict: 'A',
            replace: true,
            template: '<div></div>'
        };
    });

})(angular);
