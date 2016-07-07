/**
 * Created by oospace on 2016/7/7.
 */
'use strict';

// Basic template description.
exports.description = 'Create a oospace plugin, including QUnit unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ should not contain "oospace" or "js" and ' +
    'should be a unique ID not already in use at plugins.oospace.com. _Project ' +
    'title_ should be a human-readable title, and doesn\'t need to contain ' +
    'the word "oospace", although it may. For example, a plugin titled "Awesome ' +
    'Plugin" might have the name "awesome-plugin".' +
    '\n\n'+
    'For more information, please see the following documentation:' +
    '\n\n'+
    'Naming Your Plugin      http://plugins.oospace.com/docs/names/\n' +
    'Publishing Your Plugin  http://plugins.oospace.com/docs/publish/\n' +
    'Package Manifest        http://plugins.oospace.com/docs/package-manifest/';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
    'install_. After that, you may execute project tasks with _grunt_. For ' +
    'more information about installing and configuring Grunt, please see ' +
    'the Getting Started guide:' +
    '\n\n' +
    'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({type: 'oospace'}, [
        // Prompt for these values.
        init.prompt('name'),
        init.prompt('title', function(value, data, done) {
            // Fix oospace capitalization.
            value = value.replace(/oospace/gi, 'oospace');
            done(null, value);
        }),
        init.prompt('description', 'The best oospace plugin ever.'),
        init.prompt('version'),
        init.prompt('repository'),
        init.prompt('homepage'),
        init.prompt('bugs'),
        init.prompt('licenses', 'MIT'),
        init.prompt('author_name'),
        init.prompt('author_email'),
        init.prompt('author_url'),
        init.prompt('oospace_version')
    ], function(err, props) {
        // A few additional properties.
        props.oospacejson = props.name + '.oospace.json';
        props.dependencies = {oospace: props.oospace_version || '>= 1'};

        props.keywords = [];

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Add properly-named license files.
        init.addLicenseFiles(files, props.licenses);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props, {noProcess: 'libs/**'});

        // Generate package.json file, used by npm and grunt.
        init.writePackageJSON('package.json', {
            name: 'oospace-plugin',
            version: '0.0.0-ignored',
            npm_test: 'grunt qunit',
            // TODO: pull from grunt's package.json
            node_version: '>= 0.8.0',
            devDependencies: {
                'grunt-contrib-jshint': '~0.10.0',
                'grunt-contrib-qunit': '~0.2.0',
                'grunt-contrib-concat': '~0.3.0',
                'grunt-contrib-uglify': '~0.2.0',
                'grunt-contrib-watch': '~0.4.0',
                'grunt-contrib-clean': '~0.4.0',
            },
        });

        // Generate oospace.json file.
        init.writePackageJSON(props.oospacejson, props, function(pkg, props) {
            // The oospace site needs the "bugs" value as a string.
            if ('bugs' in props) { pkg.bugs = props.bugs; }
            return pkg;
        });

        // All done!
        done();
    });

};
