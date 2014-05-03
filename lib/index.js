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
 *  //=> { date: "2014-04-05", url: "hello-world" }
 *
 * @param  {String} file
 * @return {Object.<string, string>}
 */
var parseJekyllStylePost = function (file) {
  var match = pattern.exec(basename(file));

  return { date: match[1], url: match[2] };
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
  var defaultOptions = { ignore: [], collection: null };

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
      // Process only Jekyll posts that are not ignored.
      if (isJekyllStylePost(file) && !isIgnored(file, options.ignore)) {
        var data  = files[file],
            dir   = dirname(file),
            parts = parseJekyllStylePost(file),
            destination;

        destination = parts.url + '/index.md';
        data.date   = parts.date;
        data.url    = '/' + dir + '/' + parts.url;

        // Metalsmith uses a different template property.
        data.template   = data.layout + '.html';

        // Make it easier to use mallet plugin together with collections plugin,
        // which requires either a pattern or a collection property. mallet
        // plugin allows user to specify collection name using the options and
        // falls back to use the layout name if no collection option is provided.
        if (!data.collection) data.collection = options.collection || data.layout;

        if (dir !== '.') destination = dir + '/' + destination;

        delete files[file];

        files[destination] = data;
      }
    }

    done();
  }
};