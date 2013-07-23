/*global _, angular, WYMeditor, console*/

(function (angular) {

    'use strict';

    angular.module('fn.forms', ['ngSanitize', 'ui', 'fn.base.services', 'fn.base.directives'])

    // validators
    //---------------------------------------------------------------------

    .value('validators', (function () {
        function validatorFromRegex(regex) {
            return function (value) {
                return (!value) ? true : (value.toString().match(regex) !== null);
            };
        }
        return {
            required: function (value) { return (value !== ''); },
            path: validatorFromRegex(/^\/?([0-9A-Za-z]+[\-\/]?)*[0-9A-Za-z]+$/),
            tag: validatorFromRegex(/^([0-9A-Za-z]+\-?)*[0-9A-Za-z]+$/),
            date: validatorFromRegex(/^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/),
            spotify: validatorFromRegex(/^spotify:user:fusetv:playlist:[a-zA-Z0-9]{22}$/),
            url: validatorFromRegex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
            twitter: validatorFromRegex(/^[A-Za-z0-9_]{1,15}$/),
            number: validatorFromRegex(/^\d+$/),
            phone: validatorFromRegex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),
            zipcode: validatorFromRegex(/^\d{5}(-\d{4})?$/)
        };
    })())


    // nameFromLabel
    //---------------------------------------------------------------------

    .value('nameFromLabel', function (label) {
        return label.replace(/[\W]*/g, '');
    })

    .directive('fnForms', function() {
        return {
            restrict: 'A',
            controller: ['$rootScope', '$scope', '$location', '$timeout', function ($rootScope, $scope, $location, $timeout) {

                var params = {id: $scope.docId};
                $scope.readParams = $scope.readParams || params;
                $scope.homePath = $scope.homePath || '#/';

                if (!$scope.service) {
                    //$scope.service = $scope.$parent.service;
                    $scope.service = {
                        'read': function () {},
                        'update': function () {},
                        'delete': function () {}
                    };
                }

                $scope.load = function () {
                    $scope.service.read($scope.readParams, function (data) {
                        $scope.form = data;
                        $timeout(function () {
                            $scope.$broadcast('populate');
                        }, 0, false);
                    });
                };
                
                $scope.assign = function (data) {
                    if (data) {
                        $scope.form = data;
                    }
                    $timeout(function () {
                        $scope.$broadcast('populate');
                    }, 0, false);
                };

                $scope.save = function (data) {
                    //console.log(JSON.stringify(data));
                    console.log(data);
                    $scope.service.update($scope.readParams, $scope.beforesave ? $scope.beforesave(data) : data, function (u, response) {
                        if ($scope.aftersave && (typeof $scope.aftersave === 'function')) {
                            $scope.aftersave(data, u);
                        }
                        $location.path($scope.homePath);
                        $rootScope.$broadcast('notify', {
                            text: 'Saved'
                        });
                    });
                };

                $scope.create = function (data) {
                    //console.log(JSON.stringify(data));
                    var doc = new $scope.service($scope.beforesave ? $scope.beforesave(data) : data);
                    doc.$save(function (u, response) {
                        if ($scope.aftersave && (typeof $scope.aftersave === 'function')) {
                            $scope.aftersave(data, u);
                        }
                        $location.path($scope.homePath);
                        $rootScope.$broadcast('notify', {
                            text: 'Saved'
                        });
                    });
                };

                $scope.remove = function () {
                    $scope.service.delete(params, function (data) {
                        if ($scope.afterremove && (typeof $scope.afterremove === 'function')) {
                            $scope.afterremove(data);
                        }
                        console.log($scope.homePath);
                        $location.path($scope.homePath);
                    });
                };
                
                $scope.removeForm = function () {
                	if ($('#confirm-' + $scope.form._id).length) {
                		console.log($('#confirm-' + $scope.form._id));
                		$('#confirm-' + $scope.form._id).modal('show');
                	} else {
                		$scope.remove();
                	}
            	};

                $scope.saveForm = function() {
                    // Give directives a chance to update their scope
                    // WYMeditor for example, needs this manual request.
                    console.log('broadcast updateScope');
                    $scope.$broadcast('updateScope');

                    $timeout(function () {
                        if ($scope.onsave && (typeof $scope.onsave === 'function')) {
                            $scope.onsave($scope.form);
                        }
                    }, 0, false);
                };

                $scope.cancelForm = function() {
                    $location.path($scope.homePath);
                };

                $scope.activate = function () {
                    var readParams = {'id':$scope.docId, 'fields':'active,scheduledPublish'},
                        updateParams = {'id':$scope.docId};

                    // Because data is saved inconsistently across models for active.
                    var isTrue = function(val) {
                        return (val && val !== "" && val !== "false");
                    };

                    $scope.service.read(readParams, function (data) {
                        data.active = !isTrue(data.active);
                        data.scheduledPublish = null;
                        $scope.service.update(updateParams, data, function (data) {
                            $scope.form.active = isTrue(data.active);
                            $scope.form.scheduledPublish = data.scheduledPublish;
                        });
                    });
                };

            }],
            link: function(scope, element, attrs) {
                scope.onsave = scope[attrs.onsave];
                scope.onload = scope[attrs.onload];
                scope.beforesave = scope[attrs.presave];
                scope.aftersave = scope[attrs.postsave];
                scope.beforeremove = scope[attrs.preremove];
                scope.afterremove = scope[attrs.postremove];
                

                if (scope.onload && typeof scope.onload === 'function') {
                    scope.onload();
                }
            }
        };
    })

    // fn-forms-validate
    //---------------------------------------------------------------------

    .directive('fnFormsValidate', ['validators', function (validators) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, iElement, iAttrs, ctrl) {

                function validateFn(valueToValidate) {

                    var names = iAttrs.fnFormsValidate;
                    if (names) {
                        var result = true;
                        _.each(names.split(','), function (name) {
                            if (validators[name](valueToValidate)) {
                                result = result && true;
                                ctrl.$setValidity(name, true);
                            } else {
                                result = result && false;
                                ctrl.$setValidity(name, false);
                            }
                        });
                        return ((result) ? valueToValidate : undefined);
                    }
                    return undefined;
                }

                ctrl.$formatters.push(validateFn);
                ctrl.$parsers.push(validateFn);
            }
        };
    }])

    .factory('inputFieldFactory', function() {

        return function (attrs) {
            var type = attrs.fnFormsInput || 'text',
                settings = attrs.settings;
            var inputOpen, inputMiddle, inputClose,
                settingsObj = JSON.parse((settings||'{}').replace(/'/g, '"'));

            switch (type) {
                case 'select':
                    inputOpen = '<select class="span5" name="in{{name}}" ng-options="k as v for (k, v) in options"';
                    inputClose = ' ng-model="model">' + ((settingsObj.optional) ? '<option></option>' : '') + '</select>';
                    break;
                case 'textarea':
                    inputOpen = '<textarea class="span5" rows="6" name="in{{name}}"';
                    inputClose = ' ng-model="model">{{model}}</textarea>';
                    break;
                case 'tokenInput':
                    inputOpen = '<span fn-forms-jq-field="tokenInput" field-type="input" settings="' + settings + '"';
                    inputClose = ' ng-model="model"></span>';
                    break;
                case 'datepicker':
                    inputOpen = '<span fn-forms-jq-field="datepicker" fn-forms-validate="date"';
                    inputClose = ' ng-model="model"></span>';
                    break;
                case 'datetime':
                    inputOpen = '<span fn-forms-datetime';
                    inputClose = ' ng-model="model"></span>';
                    break;
                case 'redactor':
                    inputOpen = '<div redactor ';
                    inputClose = ' ng-model="model"></div>';
                    break;
                case 'asset':
                    inputOpen = '<div fn-forms-resource-input resource-name="Asset" options="options"';
                    inputClose = ' ng-model="model"></div>';
                    break;
                case 'page':
                    inputOpen = '<div fn-forms-resource-input resource-name="Page" options="options"';
                    inputClose = ' ng-model="model"></div>';
                    break;
                case 'location':
                    inputOpen = '<div fn-forms-location ';
                    inputClose = ' ng-model="model"></div>';
                    break;
                case 'embedly':
                    inputOpen = '<div fn-forms-embedly ';
                    inputClose = ' ng-model="model"></div>';
                    break;
                case 'tweet':
                    inputOpen = '<div fn-forms-tweet ';
                    inputClose = ' ng-model="model"></div>';
                    break;
                case 'checkbox':
                    inputOpen = ('<input data-hello="world" id="in{{name}} name="in{{name}}" type="checkbox" ') +
                        ((typeof attrs.ngTrueValue == 'string') ? ('ng-true-value="' + attrs.ngTrueValue + '"') : '') +
                        ((typeof attrs.ngFalseValue == 'string') ? ('ng-false-value="' + attrs.ngFalseValue + '"') : '');
                    inputClose = ' ng-model="model">';
                    break;
                default:
                    var classname = (type === 'checkbox') ? '' : 'class="span5"';
                    inputOpen = '<input ' + classname + ' id="in{{name}}" name="in{{name}}" type="' + type + '"';
                    inputClose = ' ng-model="model">';
            }
            inputMiddle = '';

            if (attrs.label) {
                inputMiddle += ' label="' + attrs.label + '"';
            }

            if (attrs.service) {
                inputMiddle += ' service="' + attrs.service + '"';
            }

            if (attrs.validator) {
                inputMiddle += ' fn-forms-validate="' + attrs.validator + '"';
            }

            if (attrs.disabled === "true") {
                inputMiddle += ' disabled="true"';
            }

            if (attrs.filters) {
                inputMiddle += ' filters="' + attrs.filters + '"';
            }

            return inputOpen + inputMiddle + inputClose;
        };
    })

    // fn-forms-input="type" (type: select, textarea, text, email, password, checkbox, etc.)
    //---------------------------------------------------------------------

    .directive('fnFormsInput', ['nameFromLabel', 'inputFieldFactory', function(nameFromLabel, inputFieldFactory) {
        return {
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            scope: {
                label: "@",
                service: "@",
                model: "=ngModel",
                validator: "@",
                options: "=options",
                settings: "@",
                filters: "=filters"
            },
            compile: function (tElement, tAttrs) {
                var input = inputFieldFactory(tAttrs);
                tElement.html(tElement.html().replace('[[field]]', input));
                return {
                    post: function (scope, iElement, iAttrs) {
                        scope.name = nameFromLabel(iAttrs.label || '');
                    }
                };
            },
            template: '<div ng-form name="inForm" class="control-group" ng-class="{error: inForm.$invalid}">' +
                          '<label class="control-label" for="in{{name}}">{{label}}</label>' +
                          '<div class="controls">[[field]]' +
                              '<span class="help-inline">{{errormsg}}</span>' +
                          '</div>' +
                      '</div>'
        };
    }])

    // fn-forms-actions
    //---------------------------------------------------------------------

    // NOTE: Requires the submit button to have the class .wymupdate in order for the redactor
    // to save it's state

    .directive('fnFormsActions', function() {
        return {
            restrict: 'A',
            replace: true,
            template: '<div class="control-group fn-forms-actions">' +
				'<div class="controls">' +
					'<button class="btn btn-primary" ng-click="saveForm()">Save</button>' +
					'<button class="btn" ng-click="cancelForm()">Cancel</button>' +
				'</div>' +
					'<div class="modal hide" id="confirm-{{form._id}}">'+
						'<div class="modal-header">'+
							'<button class="close" type="button" data-dismiss="modal">&times;</button>'+
							'<h3>Delete Confirmation</h3>'+
						'</div>' +
						'<div class="modal-body">'+
							'<p>Are you sure you want to delete this? The process is irreversible.</p>'+
							'<p>Please confirm to continue.</p>'+

						'</div>'+
						'<div class="modal-footer">'+
							'<button class="btn" data-dismiss="modal">No</button>'+
							'<button class="btn btn-primary" data-id="{{form._id}}" data-dismiss="modal" aria-hidden="true" ng-click="remove()">Yes</button>'+
						'</div>'+
					'</div>'+
				'</div>'
        };
    });

})(angular);
