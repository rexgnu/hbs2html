#!/usr/bin/env node

var fs   = require('fs'),
    args = require('optimist').argv,
    hbs  = require('handlebars');

var files = args._;
var partialsDir = __dirname + '/html/partials';
var outputDir = __dirname + '/html/out/';

console.log('### Registering partials in', partialsDir)
var filenames = fs.readdirSync(partialsDir);
filenames.forEach(function (filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
        return;
    }
    var name = matches[1];
    var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    hbs.registerPartial(name, template);
    console.log( "> partial " + filename + " was found");
});

console.log('### Compiling templates to', outputDir)
files.forEach(function (filename) {
    fs.readFile(filename, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var template = hbs.compile(data)();

        var outputName = filename.split('/')[1].split('.')[0]+'.html';

        fs.writeFile( outputDir + outputName, template, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log( "> " + outputName + " was compiled!");
        });
    });
});

