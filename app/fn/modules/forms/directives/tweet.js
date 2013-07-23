(function (angular) {

    'use strict';

    angular.module('fn.forms')

    // fn-forms-tweet
    //---------------------------------------------------------------------

    .directive('fnFormsTweet', function () {
        return {
            controller: ['$scope', function($scope) {
                $scope.fetchData = function () {
                    //embed.find('.embed').html('Loading...');
                    $scope.tweet.source = $scope.tweet.source.substr($scope.tweet.source.lastIndexOf('/') + 1, $scope.tweet.source.length);
                    var url = 'https://api.twitter.com/1/statuses/oembed.json?callback=?&id=' + $scope.tweet.source;
                    $.getJSON(url, function (data) {
                        //console.log(data);
                        $scope.$apply(function () {
                            var html = data.html.substr(0, data.html.indexOf('<script'));
                            if (!$scope.tweet.properties) $scope.tweet.properties = {};
                            $scope.tweet.properties.width = data.width;
                            $scope.tweet.properties.height = data.height;
                            $scope.tweet.properties.html = html;
                        });
                        twttr.widgets.load();
                    });
                }
            }],
            restrict: 'A',
            replace: true,
            require: 'ngModel',
            scope: {
                tweet: "=ngModel"
            },
            link: function(scope, element, attrs, ctrl) {
            },
            template: '<div>'+
                    '<input type="text" name="source" class="span6" ng-model="tweet.source" style="margin-bottom:10px;">'+
                    '<a class="btn btn-primary" href="javascript:void(0);" class="tweet" ng-click="fetchData()">Get It!</a>'+
                '</div>'
        };
    });
})(angular);
