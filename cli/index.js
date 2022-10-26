/*
 * Copyright (c) 2021, Irvin Pang <halo.irvin@gmail.com>
 * All rights reserved.
 * 
 * see LICENSE file for details
 */

'use strict';

var fs    = require('fs');
var path  = require('path');
var pbcli = require(path.join(getModuleRoot('protobufjs'), 'cli', 'pbjs.js'));

function getModuleRoot(module) {
    var path = require.resolve(module);
    if (path) {
        path = path.substring(0, path.lastIndexOf(module) + module.length);
    }
    return path;
}

function hasOption(argv, option, alias) {
    for (var i = 0; i < argv.length; i ++) {
        if (argv[i] === '--' + option || (alias && argv[i] === '-' + alias)) {
            return true;
        }
    }
    return false;
}

function getOptionValue(argv, option, alias) {
    for (var i = 0; i < argv.length; i ++) {
        if (argv[i] === '--' + option || (alias && argv[i] === '-' + alias)) {
            var arg = argv[i + 1];
            argv.splice(i, 2);
            return arg;
        }
    }
}

exports.main = function (argv) {
    // check output
    var output = getOptionValue(argv, 'out', 'o');
    if (!output) {
        // TODO print my help
        var ret = pbcli.main(argv);
        process.exit(ret);
    }
    if (!fs.existsSync(output) || !fs.statSync(output).isDirectory()) {
        console.error('--out must be an existing dir!');
        process.exit(1);
    }

    // check target
    var target = getOptionValue(argv, 'target', 't');
    if (!target) {
        target = 'static-mini';
    }

    var pendingTargetPath = path.join(__dirname, '..', 'dist', `${target}.js`);
    if (fs.existsSync(pendingTargetPath)) {
        target = pendingTargetPath;
    } else {
        console.error(`unknown target: ${target}. (currently support -t/--target 'static-mini' or 'static-dts')`)
        process.exit(1);
    }

    // protobuf library path
    var libraryPath = getOptionValue(argv, 'library');
    if ([ 'light', 'minimal' ].includes(libraryPath)) {
        libraryPath = `protobufjs/${libraryPath}`;
    } else if (libraryPath === undefined || libraryPath === 'full') {
        libraryPath = `protobufjs`;
    } else {
        libraryPath = path.relative(output, path.resolve(libraryPath));
    }
    global['$minipbjs_libpath'] = libraryPath.replace(/\\/g, '/');

    // excludsive protos
    var exclusiveList = getOptionValue(argv, 'exclude');
    if (exclusiveList) {
        exclusiveList = exclusiveList.split(',');
    } else {
        // defaults
        exclusiveList = [ 'google', 'gogoproto' ];
    }
    global['$minipbjs_exclude'] = exclusiveList;

    // check name
    var name = getOptionValue(argv, 'name', 'n');
    if (!name) {
        name = 'protobuf-bundles';
    }

    if (target.endsWith('static-mini.js')) {
        // create *.js
        console.log(`creating ${name}.js...`);
        argv = argv.concat([
            '--target', target,
            '--out', path.join(output, `${name}.js`)
        ]);
        var ret  = pbcli.main(argv);
        if (typeof ret === 'number' && ret > 0) {
            console.error(`exit code: ${ret}`);
            process.exit(ret);
        }

        // get uglified *.min.js?
        if (hasOption(argv, 'uglify', 'u')) {
            console.log(`creating ${name}.min.js...`);
            process.argv = [ 'bala', 'bala', path.join(output, `${name}.js`), '--output', path.join(output, `${name}.min.js`), '--compress', '--mangle' ];

            var uglifyjsPath = getModuleRoot('uglify-js');
            var uglifyjsPackage = require(path.join(uglifyjsPath, 'package.json'));
            uglifyjsPath = path.join(uglifyjsPath, uglifyjsPackage.bin.uglifyjs);
            // make sure it could be exected everty time from tests
            delete require.cache[uglifyjsPath];
            require(uglifyjsPath);
        }
    } else if (target.endsWith('static-dts.js')) {
        // create *.d.ts
        console.log(`creating ${name}.d.ts...`);
        argv = argv.concat([
            '--target', target,
            '--out', path.join(output, `${name}.d.ts`)
        ]);
        var ret  = pbcli.main(argv);
        if (typeof ret === 'number' && ret > 0) {
            console.error(`exit code: ${ret}`);
            process.exit(ret);
        }
    }

    console.log('done');
}
