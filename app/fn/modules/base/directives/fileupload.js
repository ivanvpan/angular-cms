/*global angular*/

(function (angular) {

    'use strict';

    angular.module('fn.base.directives')

    .directive('fnBaseFileupload', function () {
        return {
            restrict: 'A',
            templateUrl: fuse.base + '/fn/modules/base/partials/fileupload.html',
            replace: true,
            link: function (scope, iElement, iAttrs) {

                function showBar(event, data) {
                    iElement.find('.fileupload-buttonbar').show();
                }

                function hideBar(event, data) {
                    iElement.find('.fileupload-buttonbar').fadeOut();
                }

                $('#fileupload')
                    .bind('fileuploaddrop', showBar)
                    .bind('fileuploadfail', hideBar)
                    .fileupload()
                    .fileupload('option', {
                        multipart: true,
                        url: '/manager/' + iAttrs.resource + '/create'      // TODO: Correct Endpoint
                    });
            }
        };
    });

})(angular);

