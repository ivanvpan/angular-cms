basePath = '../';

files = [

    JASMINE,
    JASMINE_ADAPTER,

    'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
        'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js',
        'app/fn/lib/jquery/jquery.tokeninput.js',
        'app/fn/lib/jquery/redactor/jquery.wymeditor.js',
            'app/fn/lib/jquery/redactor/plugins/pastefromword/jquery.wymeditor.pastefromword.js',
            'app/fn/lib/jquery/redactor/plugins/resizable/jquery.wymeditor.resizable.js',
            'app/fn/lib/jquery/redactor/lang/en.js',
            'app/fn/lib/jquery/redactor/skins/default/skin.js',

    'app/fn/lib/underscore.js',

    'app/fn/lib/angular/angular.js',
        'app/fn/lib/angular/angular-*.js',
        'app/fn/lib/angular-ui/angular-ui.js',

    'test/lib/angular/angular-mocks.js',
    'app/fn/lib/ui-bootstrap-0.1.0.js',
    'app/fn/modules/**/*.js',
    'test/unit/**/*.js'
];

preprocessors = {
    '**/*.html': 'html2js'
}

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
};
