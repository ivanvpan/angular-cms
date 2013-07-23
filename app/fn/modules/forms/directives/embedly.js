(function (angular) {

    'use strict';

    angular.module('fn.forms')

    // fn-forms-embedly
    //---------------------------------------------------------------------

    .directive('fnFormsEmbedly', function () {
        return {
            controller: ['$scope', function($scope) {
                $scope.fetchData = function () {
					//embed.find('.embed').html('Loading...');
					$.embedly($scope.embed.source,
						{
							key:'0b57638a529311e184354040d3dc5c07',
							maxWidth:620
						},
						function(oembed){
							$scope.$apply(function () {
								$scope.embed.properties.width = oembed.width;
								$scope.embed.properties.height = oembed.height;
								$scope.embed.properties.html = oembed.html;
							});
					})
                }
            }],
            restrict: 'A',
            replace: true,
            require: 'ngModel',
            scope: {
                embed: "=ngModel"
            },
            link: function(scope, element, attrs, ctrl) {
            },
            template: '<div>'+
                    //'<span>Embed.ly (Compatible URL -> Get It! -> Save on success)&nbsp;</span><br>'+
                    '<input type="text" name="source" class="span6" ng-model="embed.source" style="margin-bottom:10px;">'+
                    '<a class="btn btn-primary" href="javascript:void(0);" class="embedly" ng-click="fetchData()">Get It!</a>'+
                    '<a class="btn btn-success" href="http://embed.ly/providers", target="_blank">See Provider List</a>'+
                '</div>'
        };
    });
})(angular);
