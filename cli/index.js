/*
 * Copyright (c) 2021, Irvin Pang <halo.irvin@gmail.com>
 * All rights reserved.
 * 
 * see LICENSE file for details
 */

'use strict';

var fs    = require('fs');
var path  = require('path');
var pbcli = require(path.join(__dirname, '..', 'node_modules', 'protobufjs', 'cli', 'pbjs.js'));

function getOption(argv, option, alias) {
    for (var i = 0; i < argv.length; i ++) {
        if (argv[i] === '--' + option || argv[i] === '-' + alias) {
            var arg = argv[i + 1];
            argv.splice(i, 2);
            return arg;
        }
    }
}

exports.main = function (argv) {
    // check output
    var output = getOption(argv, 'out', 'o');
    if (!output) {
        // TODO print my help
        var ret = pbcli.main(argv);
        process.exit(ret);
    }
    if (!fs.existsSync(output) || !fs.statSync(output).isDirectory()) {
        console.error('--out must be an existing dir!');
        return 1;
    }

    // check target
    var target = getOption(argv, 'target', 't');
    if (!target) {
        target = path.join(__dirname, '..', 'dist', 'static-mini.js');
    } else {
        console.warn('using original target: ' + target);
    }

    // check name
    var name = getOption(argv, 'name', 'n');
    if (!name) {
        name = 'protobuf-bundles';
    }

    // // create *.d.ts
    // console.log(`creating ${name}.d.ts...`);
    // var argv = process.argv.concat([
    //     '--target', target,
    //     '--out', path.join(output, `${name}.d.ts`)
    // ]);
    // var ret  = pbcli.main(argv);
    // if (typeof ret === 'number' && ret > 0) {
    //     return ret;
    // }

    // create *.js
    console.log(`creating ${name}.js...`);
    argv = argv.concat([
        '--target', target,
        '--out', path.join(output, `${name}.js`)
    ]);
    var ret  = pbcli.main(argv);
    if (typeof ret === 'number' && ret > 0) {
        return ret;
    }

    // get uglified *.min.js
    console.log(`creating ${name}.min.js...`);
    process.argv = [ 'bala', 'bala', path.join(output, `${name}.js`), '--output', path.join(output, `${name}.min.js`), '--compress', '--mangle' ];
    let uglifyjsPath = path.join(__dirname, '..', 'node_modules', 'uglify-js');
    // make sure it could be exected everty time from tests
    try {
        // cnpm use symlinks
        uglifyjsPath = path.join(__dirname, '..', 'node_modules', fs.readlinkSync(uglifyjsPath));
    } catch (e) {}

    var uglifyjsBin = path.join(uglifyjsPath, 'bin', 'uglifyjs');
    delete require.cache[uglifyjsBin];
    require(uglifyjsBin);

    console.log('done');
}
