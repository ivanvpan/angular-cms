/*global module, describe, beforeEach, it, inject, expect, angular, NgModelController, WYMeditor*/

'use strict';

/* jasmine specs for directives go here */

/*
//use as an example, delete when done
describe('directives', function() {
  beforeEach(module('myApp.directives'));

  describe('app-version', function() {
    it('should print current version', function() {
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });
});
*/

/*
describe('login directive', function() {
    var element,
        scope;

    beforeEach(module('login'));


    beforeEach(function() {
        module('js/login/modal.html');
    });

    describe('loginModal', function() {
        it('should be invisible on init', function() {
            expect(element.css('display')).toBe('none');
        });

        it('should be visible ', function() {
            expect(element.css('display')).toBe('none');
        });
    });
});
*/

describe('Forms', function() {
    var scope, changeInputValueTo;

    changeInputValueTo = function(value) {
        scope.$apply(function(){
            scope.model = value;
        });
    };

    beforeEach(module('fn.forms'));

    describe('Rich Text', function() {

        describe('field', function() {
            var elm, updateFns;

            beforeEach(inject(function($rootScope, $compile, $timeout) {
                scope = $rootScope.$new();
                scope.form = {
                    richtext: "<p>hey there!</p>"
                };

                var tmpl = angular.element('<div fn-forms-jq-field="redactor" field-type="textarea" label="Test Field" ng-model="page.richtext"></div>');
                elm = $compile(tmpl)(scope);
                scope.$apply();
            }));

            it('should be wrapped in a "control-group"', function() {
                expect(elm.hasClass('control-group')).toBe(true);
            });

            it('should contain a label field', function() {
                var label = elm.find('label');
                expect(label[0]).not.toBe(undefined);
                expect(label.attr('for')).toBe('inTestField');
                expect(label.text()).toBe('Test Field');
            });

            it('should contain a "controls" div', function() {
                var controls = elm.find('.controls');
                expect(controls[0]).not.toBe(undefined);
            });

            it('should contain an textarea field', function() {
                var input = elm.find('#inTestField');
                expect(input[0]).not.toBe(undefined);
                expect(input.attr('id')).toBe('inTestField');
                expect(input.attr('name')).toBe('inTestField');
                expect(input.attr('ng-model')).toBe('model');
                expect(input.hasClass('ng-valid')).toBe(true);
            });
        });
    });

    describe('Resource Input', function() {
        describe('field', function() {
            var elm;

            beforeEach(inject(function($httpBackend) {
                $httpBackend.whenGET('/asset?limit=12&page=1&title=').respond({
                    "numPages": 1,
                    "page": 1,
                    "results": [
                        {
                            "_id": "4f1eea3f76f5dabc4a000047",
                            "created": "2012-01-24T17:28:31.507Z",
                            "lastModified": "2012-01-24T17:28:31.507Z",
                            "title": "asset 1"
                        },
                        {
                            "_id": "4f1eea5976f5dabc4a000049",
                            "created": "2012-01-24T17:28:57.411Z",
                            "lastModified": "2012-01-24T17:28:57.411Z",
                            "title": "Trent Reznor"
                        },
                        {
                            "_id": "4f1eef1a17f54b514a000131",
                            "created": "2012-01-24T17:49:14.627Z",
                            "lastModified": "2012-01-24T17:49:14.627Z",
                            "title": "Lady Gaga"
                        }
                    ]
                });
            }));

            beforeEach(inject(function($rootScope, $compile) {
                scope = $rootScope.$new();
                var tmpl = angular.element('<div fn-forms-resource-input label="Asset" resource-name="Asset" ng-model="form.asset"></div>');
                elm = $compile(tmpl)(scope);
                scope.$apply();
            }));

            it('should be wrapped in a "control-group"', function() {
                expect(elm.hasClass('control-group')).toBe(true);
            });

            it('should contain a label field', function() {
                var label = elm.find('label');
                expect(label[0]).not.toBe(undefined);
                expect(label.attr('for')).toBe('inAsset');
                expect(label.text()).toBe('Asset');
            });

            it('should contain a "controls" div', function() {
                var controls = elm.find('.controls');
                expect(controls[0]).not.toBe(undefined);
            });

            it('should contain an "asset-field" div', function() {
                var controls = elm.find('.asset-field');
                expect(controls[0]).not.toBe(undefined);
            });

            it('should contain an "resource-picker" div', function() {
                var controls = elm.find('.resource-picker');
                expect(controls[0]).not.toBe(undefined);
            });
        });
    });

    describe('Token Input', function() {

        describe('field', function() {
            var elm;

            beforeEach(inject(function($httpBackend) {
                $httpBackend.whenGET('/tag').respond({
                    "numPages": 1,
                    "page": 1,
                    "results": [
                        {
                            "_id": "4f1eea3f76f5dabc4a000047",
                            "created": "2012-01-24T17:28:31.507Z",
                            "lastModified": "2012-01-24T17:28:31.507Z",
                            "title": "news",
                            "namespace": "section",
                            "path": "news"
                        },
                        {
                            "_id": "4f1eea5976f5dabc4a000049",
                            "created": "2012-01-24T17:28:57.411Z",
                            "lastModified": "2012-01-24T17:28:57.411Z",
                            "title": "Trent Reznor",
                            "namespace": "artist",
                            "path": "trent-reznor"
                        },
                        {
                            "_id": "4f1eef1a17f54b514a000131",
                            "created": "2012-01-24T17:49:14.627Z",
                            "lastModified": "2012-01-24T17:49:14.627Z",
                            "title": "Lady Gaga",
                            "namespace": "artist",
                            "path": "lady-gaga"
                        }
                    ]
                });
            }));

            beforeEach(inject(function($rootScope, $compile) {
                scope = $rootScope.$new();

                scope.prepop = {
                    token: [
                        {
                            "_id": "4f1eef1a17f54b514a000131",
                            "created": "2012-01-24T17:49:14.627Z",
                            "lastModified": "2012-01-24T17:49:14.627Z",
                            "title": "Lady Gaga",
                            "namespace": "artist",
                            "path": "lady-gaga"
                        }
                    ]
                };

                scope.page = {
                    token: "4f1eef1a17f54b514a000131"
                };

                var tmpl = angular.element('<div fn-forms-jq-field="tokenInput" field-type="input" label="Test Field" service="TagCollection" prepop="token" ng-model="page.token"></div>');
                elm = $compile(tmpl)(scope);
                scope.$apply();
            }));

            it('should be wrapped in a "control-group"', function() {
                expect(elm.hasClass('control-group')).toBe(true);
            });

            it('should contain a label field', function() {
                var label = elm.find('label');
                expect(label[0]).not.toBe(undefined);
                expect(label.attr('for')).toBe('inTestField');
                expect(label.text()).toBe('Test Field');
            });

            it('should contain a "controls" div', function() {
                var controls = elm.find('.controls');
                expect(controls[0]).not.toBe(undefined);
            });

/** Not working right now.  Race condition with plugin being instantiated.

            it('should contain an input field', function() {
                var input = elm.find('#inTestField');
                expect(input[0]).not.toBe(undefined);
                expect(input.attr('id')).toBe('inTestField');
                expect(input.attr('name')).toBe('inTestField');
                expect(input.attr('type')).toBe('text');
                expect(input.attr('ng-model')).toBe('model');
                expect(input.hasClass('ng-valid')).toBe(true);
            });

            it('should allow adding a token', function() {
                console.log(elm.html());
                var input = elm.find('#inTestField');
                input.tokenInput("add", {"_id":"TestAdd", "title":"TestAdd", "namespace":"test"});
                var added = /test:TestAdd/.test(elm.html().toString());
                expect(added).toBe(true);
                expect(scope.page.token).toBe('4f1eef1a17f54b514a000131,TestAdd');
            });

            it('should allow deleting a token', function() {
                var input = elm.find('#inTestField');
                input.tokenInput("remove", {"_id":"4f1eef1a17f54b514a000131"});
                console.log(elm.html());
                var exists = /artist:Lady Gaga/.test(elm.html());
                expect(exists).toBe(false);
                expect(scope.page.token).toBe('');
            });

 **/
        });

    });

    describe('Text Input', function() {

        describe('field', function() {
            var elm;

            beforeEach(inject(function($rootScope, $compile) {
                scope = $rootScope.$new();
                var tmpl = angular.element('<div fn-forms-input label="Path" ng-model="model"></div>');
                elm = $compile(tmpl)(scope);
                scope.$apply();
            }));

            it('should be wrapped in a "control-group"', function() {
                expect(elm.hasClass('control-group')).toBe(true);
            });

            it('should contain a label field', function() {
                var label = elm.find('label');
                expect(label[0]).not.toBe(undefined);
                expect(label.attr('for')).toBe('inPath');
                expect(label.text()).toBe('Path');
            });

            it('should contain a "controls" div', function() {
                var controls = elm.find('.controls');
                expect(controls[0]).not.toBe(undefined);
            });

            it('should contain an input field', function() {
                console.log(elm.html());
                var input = elm.find('input');
                expect(input[0]).not.toBe(undefined);
                expect(input.attr('id')).toBe('inPath');
                expect(input.attr('name')).toBe('inPath');
                expect(input.attr('type')).toBe('text');
                expect(input.attr('ng-model')).toBe('model');
            });
        });

        describe('Validator', function() {
            var elm, input, v;

            describe('"tag"', function() {

                beforeEach(inject(function($rootScope, $compile, validators) {
                    v = validators.tag;
                    scope = $rootScope.$new();
                    var tmpl = angular.element('<div fn-forms-input label="Tag" validator="tag" ng-model="model"></div>');
                    elm = $compile(tmpl)(scope);
                    scope.$apply();
                    input = elm.find('input');
                }));

                it('value should only contain a-z A-Z 0-9 "-"', function() {
                    expect(v('a1Aa')).toBe(true);
                    expect(v('a1-Aa')).toBe(true);
                    expect(v('a1-#a')).toBe(false);
                    expect(v('a1-@a')).toBe(false);
                    expect(v('a1-!a')).toBe(false);
                    expect(v('a1-\'a')).toBe(false);
                });

                it('value should only lead with a-z A-Z 0-9', function() {
                    expect(v('aa')).toBe(true);
                    expect(v('1a')).toBe(true);
                    expect(v('Aa')).toBe(true);
                    expect(v('-a')).toBe(false);
                });

                it('value should only end with a-z A-Z 0-9', function() {
                    expect(v('aa')).toBe(true);
                    expect(v('a1')).toBe(true);
                    expect(v('aA')).toBe(true);
                    expect(v('a-')).toBe(false);
                });

                it('should be invalid with a double slash', function() {
                    expect(v('a--a')).toBe(false);
                });

                it('should set the input\'s class to "ng-invalid-tag" when the value is invalid', function() {
                    changeInputValueTo('/123');
                    expect(input.hasClass('ng-invalid-tag')).toBe(true);
                });
            });

            describe('"path"', function() {

                beforeEach(inject(function($rootScope, $compile, validators) {
                    v = validators.path;
                    scope = $rootScope.$new();
                    var tmpl = angular.element('<div fn-forms-input label="Path" validator="path" ng-model="model"></div>');
                    elm = $compile(tmpl)(scope);
                    scope.$apply();
                    input = elm.find('input');
                }));

                it('value should only contain a-z A-Z 0-9 "-" and "/"', function() {
                    expect(v('abc-ABC/123')).toBe(true);
                    expect(v('abc-ABC!/123')).toBe(false);
                    expect(v('abc-ABC@/123')).toBe(false);
                    expect(v('abc-ABC"/123')).toBe(false);
                    expect(v('abc-ABC\'/123')).toBe(false);
                    expect(v('abc-ABC#/123')).toBe(false);
                    expect(v('abc-ABC(/123')).toBe(false);
                    expect(v('abc-ABC)/123')).toBe(false);
                });

                it('value should only lead with a-z A-Z 0-9', function() {
                    expect(v('abc')).toBe(true);
                    expect(v('ABC')).toBe(true);
                    expect(v('123')).toBe(true);
                    expect(v('/123')).toBe(false);
                    expect(v('-123')).toBe(false);
                });

                it('value should only end with a-z A-Z 0-9', function() {
                    expect(v('abc')).toBe(true);
                    expect(v('ABC')).toBe(true);
                    expect(v('123')).toBe(true);
                    expect(v('123-')).toBe(false);
                    expect(v('123/')).toBe(false);
                });

                it('should be invalid with a double slash', function() {
                    expect(v('123--123')).toBe(false);
                });

                it('should be invalid with a double dash', function() {
                    expect(v('123//123')).toBe(false);
                });

                it('should set the input\'s class to "ng-invalid-path" when the value is invalid', function() {
                    changeInputValueTo('/123');
                    expect(input.hasClass('ng-invalid-path')).toBe(true);
                });
            });
        });
    });
});
