/*global angular*/

(function (angular) {

    'use strict';

    angular.module('fn.base.directives')

    .directive('fnBaseImageModal', function () {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, iElement, iAttrs) {

                iElement.on('click', function(event) {
                    var width = parseInt(iAttrs.width, 10) || 800,
                        height = parseInt(iAttrs.height, 10) || 600,
                        modalHtml = '<div class="modal">' +
                                        '<div class="modal-header"><%= title %></div>' +
                                        '<div class="modal-body" style="text-align: center">' +
                                            '<img src="<%= url %>"></img>' +
                                        '</div>' +
                                        '<div class="modal-footer">' +
                                            '<a href="#" class="btn" data-dismiss="modal">Close</a>' +
                                        '</div>' +
                                    '</div>',
                        modalData = {url: iAttrs.href, title: iAttrs.title},
                        modalTmpl = _.template(modalHtml, modalData),
                        windowWidth = $(window).width(),
                        windowHeight = $(window).height(),
                        $modal = $(modalTmpl);

                    if (width > windowWidth) {
                        width = windowWidth - 200;
                    }

                    if (height > windowHeight) {
                        height = windowHeight - 200;
                        width = (height / iAttrs.height) * width;
                        $modal.find('.modal-body img').css({
                            width: width,
                            height: height
                        });
                    }

                    if (width && height) {
                        $modal.find('.modal-body').css('max-height', height);
                        $modal.css('width', width);
                        $modal.on('shown', function()  {
                            $modal.css({
                                'margin-left':  -($modal.outerWidth() / 2)
                            });
                        });
                    }

                    console.log(width, height);
                    console.log(windowWidth, windowHeight);
                    console.log('----');

                    $modal.modal();
                });

            }
        };
    });

})(angular);

