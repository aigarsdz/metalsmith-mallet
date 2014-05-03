var basename = require('path').basename,
    dirname  = require('path').dirname,
    extname  = require('path').extname;

/**
 * Jekyll style post filenames have a specific format e.g. 2014-03-10-demo-post.md,
 * where the first part is a date and the second part is used for a permalink.
 *
 * @type {RegExp}
 */
var pattern = /^([0-9-]+)-(.+)\.md$/;

/**
 * Check for Markdown files. This function is taken directly from
 * metalsmith-markdown plugin.
 *
 * @example
 *
 *  isMarkdown("hello-world.ms"); //=> true
 *  isMarkdown("hello-world.html"); //=> false
 *
 * @param  {String}  file
 * @return {Boolean}
 */
var isMarkdown = function (file) {
  return /\.md|\.markdown/.test(extname(file));
};

/**
 * Checks for Jekyll style posts.
 *
 * @example
 *
 *  isJekyllStylePost("2014-04-05-hello-world.md"); //=> true
 *  isJekyllStylePost("sop-secret.md"); //=> false
 *
 * @param  {String}  file
 * @return {Boolean}
 */
var isJekyllStylePost = function (file) {
  return pattern.test(basename(file));
};

/**
 * Extracts date and permalink parts from a Jekyll style post.
 *
 * @example
 *
 *  parseJekyllStylePost("2014-04-05-hello-world.md");
 *  //=> { date: "2014-04-05", name: "hello-world" }
 *
 * @param  {String} file
 * @return {Object.<string, string>}
 */
var parseJekyllStylePost = function (file) {
  var match = pattern.exec(basename(file));

  return { date: match[1], name: match[2] };
};

/**
 * Check whether the file should be ignored.
 *
 * @param  {String}  file
 * @param  {Array}   blacklist
 * @return {Bollean}
 */
var isIgnored = function (file, blacklist) {
  return blacklist.indexOf(file) !== -1;
};

/**
 * Merges user provided options with the defaults.
 *
 * @param  {Object} userOptions
 * @return {Object}             Default: { ignore: [] }
 */
var mergeOptions = function (userOptions) {
  var defaultOptions = { ignore: [] };

  for (var opt in userOptions) defaultOptions[opt] = userOptions[opt];

  return defaultOptions;
};

/**
 * Exposes the plugin.
 *
 * @param  {Object}   options
 * @return {Function}
 */
module.exports = function (options) {
  options = mergeOptions(options);

  return function (files, metalsmith, done) {
    for (var file in files) {
      if (isJekyllStylePost(file) && !isIgnored(file, options.ignore)) {
        var data = files[file],
            dir  = dirname(file),
            destination,
            parts = parseJekyllStylePost(file);

        destination = parts.name + '/index.md';
        data.date   = parts.date;
        data.url    = '/' + dir + '/' + parts.name;
        data.template   = data.layout + '.html';
        data.collection = data.layout;

        if ('.' != dir) destination = dir + '/' + destination;

        delete files[file];

        files[destination] = data;
      }
    }

    done();
  }
};