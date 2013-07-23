/*global angular, WYMeditor, _*/

/**
 * This directive lets you wrap an existing jQuery plugin in an Angular directive
 * that places the component on the DOM inside a Bootstrap "control-group"
 *
 * The service should be named the same as the plugin with the addition of
 * "Service" as in "datepickerService" if "datepicker" is the jQuery plugin
 * method to call on the component.
 *
 * You must create a service for the plugin and that service will return an object
 * with three __optional__ functions:
 *
 * update - called by saving the form to give the plugin an opportunity to update
 *          the model with a current value.  Usually not needed, but WYMeditor
 *          requires it.
 *
 * populate - called when the data is originally fetched by the form and used to
 *          pre-populate the component with default data.  Since data is loaded
 *          asyncronously, the component might not have the data on creation.
 *
 * createOptions - a function to return an options object to pass to the jQuery
 *         plugin on instantiation.
 *
 * Example directive:
 * ------------------
 * <div fn-forms-jq-field="datepicker" label="Publication Date"
 *      ng-model="form.pubdate" validator="date" required></div>
 *
 * "datepicker" is the case-sensitive jQuery method to call on the component
 * when initializing the plugin.  (e.g. $('#dp').datepicker())
 */

(function (angular) {

    'use strict';

    angular.module('fn.forms')

        // services
        //---------------------------------------------------------------------

        .factory('datepickerService', function() {
            return {};
        })

        .factory('tokenInputService', ['$injector', '$timeout', function ($injector, $timeout) {
            var resp = {};

            resp.update = function (opts) {
                return function () {
                    // convert scope to desired format based on settings attribute
                    // defaults to array
                    switch (opts.settings.output) {
                        case 'string':
                            if (_.isArray(opts.scope.model)) {
                                opts.scope.model = opts.scope.model.join(',');
                            }
                            if (_.isNull(opts.scope.model)) {
                                opts.scope.model = '';
                            }
                            if (_.isUndefined(opts.scope.model)) {
                                opts.scope.model = '';
                            }
                            break;
                        case 'array':
                            if (_.isString(opts.scope.model)) {
                                opts.scope.model = (opts.scope.model === "") ? [] : opts.scope.model.split(',');
                            }
                            if (_.isNull(opts.scope.model)) {
                                opts.scope.model = [];
                            }
                            if (_.isUndefined(opts.scope.model)) {
                                opts.scope.model = [];
                            }
                            break;
                        default:
                            if (_.isString(opts.scope.model)) {
                                opts.scope.model = (opts.scope.model === "") ? [] : opts.scope.model.split(',');
                            }
                            if (_.isNull(opts.scope.model)) {
                                opts.scope.model = [];
                            }
                            if (_.isUndefined(opts.scope.model)) {
                                opts.scope.model = [];
                            }
                    }

                };
            };

            resp.populate = function (opts) {
                return function () {
                    // Populate the TokenInput with data
                    if (!opts.scope.model) return null;
                    if (!(opts.scope.model instanceof Array)) {
                        opts.scope.model = [opts.scope.model];
                    }
                    _.each(opts.scope.model, function (tag) {
                        if (!tag) return null;
                        tag._isInit = true;  // prevent trigger
                        if (!opts.field.data('tokenInputObject')) {
                            if (!opts.queue) opts.queue = [];
                            opts.queue.push(tag);
                        } else {
                            opts.field.tokenInput('add', tag);
                        }
                    });
                    // Set the model to be a comma delimited string of ObjectIds
                    if (opts.scope.model instanceof Array) {
                        opts.scope.model = _.pluck(opts.scope.model, '_id');
                    }
                };
            };

            resp.createOptions = function(opts, callback) {

                // Settings are in JSON format but using apostrophe instead of double quote because they are
                // stored in an HTML attribute.
                opts.settings = opts.settings || '{"search":"title","display":"<% if (namespace) {%><%=namespace%> <%}<%>:<%=title%>"}';

                // They need to be converted back to double quotes before the JSON parser.
                opts.settings = opts.settings.replace(/'/g,'"');
                
                if (!opts.queue) {
                    opts.queue = [];
                }

                var service = $injector.get(opts.serviceName),
                    settings = opts.settings = JSON.parse(opts.settings),
                    tmpl = _.template("<li><div style='display: inline-block; padding-left: 10px;'>" + settings.display + "</div></li>");
                if (service) {
                    callback([
                        service.endpoint,
                        {
                            tokenValue:'_id',
                            propertyToSearch:settings.search,
                            minChars:2,
                            tokenLimit:settings.tokenLimit || 30,
                            processPrePopulate:true,
                            queryParam:settings.search,
                            jsonContainer:'results',
                            resultsFormatter:tmpl,
                            tokenFormatter:tmpl,
                            theme: 'facebook',
                            onAdd: function (data) {
                                if (!data._isInit) {
                                    opts.field.trigger('input');
                                }
                            },
                            onDelete: function (data) {
                                opts.field.trigger('input');
                            },
                            onReady: function (data) {
                                $timeout(function () {
                                    _.each(opts.queue, function (item, i, l) {
                                        if (!item) return null;
                                        //console.log('adding tokeninput item', item);
                                        opts.field.tokenInput('add', item);
                                    });
                                    opts.queue = [];
                                }, 0);
                            }
                        }
                    ]);
                }
            };

            return resp;
        }])
        
        .factory('redactorService', function () {
            var resp = {};
            resp.destroy = function (opts) {
                $(opts.field).redactor('destroy');
            };
            
            resp.update = function (opts) {
                console.log(opts);
                return function () {
                    opts.scope.model = $(opts.field).redactor('get');
                };
            };
            
            resp.populate = function (opts) {
                console.log(opts);
                return function () {
                    $(opts.field).redactor('set', opts.scope.model);
                };
            };
            
            resp.createOptions = function (opts, callback) {
                console.log(opts);
                callback([{
                    //iframe: true,
                    autoresize: true,
                    wym: true
                }]);
            };
            
            return resp;
        })

        // fn-forms-jq-input="type" (type: redactor, datepicker, tokenInput, etc.)
        //---------------------------------------------------------------------

        .directive('fnFormsJqField', ['$injector', '$timeout', 'nameFromLabel', function($injector, $timeout, nameFromLabel) {
            return {
                restrict: 'A',
                require: 'ngModel',
                replace: true,
                scope: {
                    label: "@",
                    model: "=ngModel",
                    validator: "@",
                    search: '@',
                    settings: '@'
                },
                compile: function (tElement, tAttrs, transclude) {
                    var pluginName, field, fieldType, fieldHtml, name;

                    fieldType = tAttrs.fieldType || 'input';
                    pluginName = tAttrs.fnFormsJqField;
                    name = nameFromLabel(tElement.attr('label') || '');

                    // Make sure the jQuery plugin is installed before continuing
                    if (!$('body')[pluginName]) {
                        throw new Error('fn-forms-jq-field: The "' + pluginName + '" function does not exist');
                    }

                    // Replace the [[field]] with the appropriate field type for the plugin
                    if (fieldType === 'textarea') {
                        fieldHtml = '<textarea class="span5" id="in' + name + '" name="in' + name + '" ng-model="model"></textarea>';
                    } else {
                        fieldHtml = '<input class="span5" id="in' + name + '" name="in' + name + '" type="text" ng-model="model"';
                        if (tAttrs.validator) {
                            fieldHtml += ' fn-forms-validate="' + tAttrs.validator + '"';
                        }
                        fieldHtml += '>';
                    }

                    tElement.html(fieldHtml);
                    field = tElement.find(fieldType);

                    return {
                        pre: function preLink(scope, iElement, iAttrs) {
                        },
                        post: function postLink(scope, iElement, iAttrs) {
                            var linkedField = iElement.find(fieldType),
                                jqOptsSrv = $injector.get(pluginName + 'Service'),
                                serviceOpts = {
                                    scope: scope,
                                    field: linkedField,
                                    serviceName: tAttrs.service,
                                    settings: tAttrs.settings
                                };

                            // Instantiate the plugin with options returned from the
                            // service.
                            $timeout(function() {
                                if (typeof jqOptsSrv.createOptions === 'function') {
                                    jqOptsSrv.createOptions(serviceOpts, function (opts) {
                                        //console.log(pluginName);
                                        field[pluginName].apply(linkedField, opts);
                                    });
                                } else {
                                    field[pluginName].apply(linkedField, []);
                                }
                            }, 30, false);

                            // Listen for a request to update the scope manually
                            // Some components like WYMeditor need this or the scope
                            // will not be updated.
                            if (typeof jqOptsSrv.update === 'function') {
                                scope.$on('updateScope', jqOptsSrv.update(serviceOpts));
                            }

                            // Listen for a request to populate the component with
                            // data.  Since the directive gets created asyncronously
                            // it usually get created before the data is ready.
                            if (typeof jqOptsSrv.populate === 'function') {
                                scope.$on('populate', jqOptsSrv.populate(serviceOpts));
                            }

                            // Let the scope know about the value change
                            if (iAttrs.ngModel && linkedField.is('select,input,textarea')) {
                                linkedField.on('change', function (event) {
                                    linkedField.trigger('input');
                                });
                            }

                            iElement.bind('$destroy', function () {
                                if (typeof jqOptsSrv.destroy === 'function') {
                                    jqOptsSrv.destroy(serviceOpts)();
                                }
                                serviceOpts.field = null;
                                serviceOpts.scope = null;
                                linkedField.off('change');
                                //linkedField.remove();
                            });
                        }
                    };
                },
                template: '<span></span>'
            };
        }]);

})(angular);
