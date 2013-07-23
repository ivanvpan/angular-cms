/*global angular*/

(function (angular) {

    'use strict';

    angular.module('fn.base.directives')

    .directive('fnBasePagination', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            template: '<div class="pagination text-center"><ul></ul></div>',
            replace: true,
            scope: {
                current : '=currentPage',
                max : '=maxPages',
                base : '@base',
                format : '@format'
            },
            link: function (scope, el, attrs) {
                function parseAdditionalArgs(args){
                    return args===''? args: '&'+qs.encode(args);
                }
                scope.selectPage = function (page) {
                    if (!(scope.current == page)) {
                        scope.current = page;
                    }
                };
                scope.previous = function () {
                    if (!(scope.current == 1)) {
                        scope.current = scope.current - 1;
                    }
                };
                scope.next = function () {
                    if (!(scope.current == scope.max)) {
                        scope.current = scope.current + 1;
                    }
                };
                scope.$watch('current + max', function() {
                    var current = parseInt(scope.current),
                        max = parseInt(scope.max);
                    var dots, link, n, n_display, output, page_links, settings = {}, opts = opts || {};
                    settings = [];
                    //settings['base'] = '#%_%';
                    //settings['format'] = '/p/%#%';
                    settings['base'] = scope.base || '';
                    settings['format'] = scope.format || '';
                    settings['total'] = Number(max);
                    settings['current'] = Number(current);
                    settings['show_all'] = false;
                    settings['prev_next'] = true;
                    settings['prev_text'] = '&larr; Previous';
                    settings['next_text'] = 'Next &rarr;';
                    settings['end_size'] = 3;
                    settings['mid_size'] = 3;
                    settings['add_args'] = parseAdditionalArgs('');
                    page_links = new Array();
                    dots = false;
                    if (settings['prev_text'] && settings['current'] && 1 < settings['current']) {
                        link = settings["base"].replace("%_%", settings["format"]);
                        link = link.replace("%#%", settings["current"] - 1);
                        page_links.push('<li class="prev" ng-click="previous()"><a href="' + link + settings["add_args"] + '">' + settings["prev_text"] + '</a></li>');
                    } else {
                        page_links.push('<li class="prev disabled"><a href="#">' + settings["prev_text"] + '</a></li>');
                    }
                    n = 1;
                    while (n <= settings["total"]) {
                        n_display = n;
                        if (n === settings["current"]) {
                            page_links.push('<li class="active"><a href="' + link + settings["add_args"] + '">' + n_display + '</a></li>');
                            dots = true;
                        } else {
                            if (settings["show_all"] || (n <= settings["end_size"] || (settings["current"] && n >= settings["current"] - settings["mid_size"] && n <= settings["current"] + settings["mid_size"]) || n > settings["total"] - settings["end_size"])) {
                                link = settings["base"].replace("%_%", settings["format"]);
                                link = link.replace("%#%", n);
                                page_links.push('<li ng-click=selectPage(' + n_display + ')><a href="' + link + settings["add_args"] + '">' + n_display + '</a></li>');
                                dots = true;
                            } else if (dots && !settings["show_all"]) {
                                page_links.push('<li class="disabled"><a href="#">...</a></li>');
                                dots = false;
                            }
                        }
                        n++;
                    }
                    if (settings["prev_next"] && settings["current"] && (settings["current"] < settings["total"] || -1 === settings["total"])) {
                        link = settings["base"].replace("%_%", settings["format"]);
                        link = link.replace("%#%", parseInt(settings["current"]) + 1);
                        page_links.push('<li class="next" ng-click="next()"><a href="' + link + settings["add_args"] + '">' + settings["next_text"] + '</a></li>');
                    } else {
                        page_links.push('<li class="next disabled"><a href="#">' + settings["next_text"] + '</a></li>');
                    }
                    $(el).find('ul').html(page_links.join(''));
                    $compile(el.contents())(scope);
                });
            }

        }
    }]);

})(angular);
