var basename = require('path').basename,
    dirname  = require('path').dirname,
    extname  = require('path').extname;

/**
 * Jekyll style post filenames have a specific format e.g. 2014-03-10-demk-post.md,
 * where the first part is a date and the second is used for a permalink.
 *
 * @type {RegExp}
 */
var pattern = /^([0-9-]+)-(.+)\.md$/;

/**
 * Check for Markdown files. This function is taken directly from
 * metalsmith-markdown plugin.
 *
 * @param  {String} file
 * @return {Boolean}
 */
var markdown = function (file) {
  return /\.md|\.markdown/.test(extname(file));
};

/**
 * Checks for Jekyll style posts.
 *
 * @param  {String}  file
 * @return {Boolean}
 */
var isJekyllStylePost = function (file) {
  return pattern.test(file);
};

/**
 * Extracts date and permalink parts from a Jekyll style post.
 *
 * @param  {String} file
 * @return {Object.<string, string>}
 */
var parseJekyllStylePost = function (file) {
  var match = pattern.exec(basename(file));

  return { date: match[1], name: match[2] };
};

/**
 * Expose plugin
 * @type {Function}
 */
module.exports = function (options) {
  options = options || {};
  var keys = options.keys || [];

  return function (files, metalsmith, done) {
    setImmediate(done);

    Object.keys(files).forEach(function (file) {
      if (!markdown(file)) return;

      var data = files[file],
          dir = dirname(file),
          destination;

      if (isJekyllStylePost(file)) {
        var parts = parseJekyllStylePost(file);

        // Keep the .md extension so the file would be parsed by the
        // metalsmith-markdown extension.
        destination = parts.name + '/index.md';

        data.date = parts.date; // Set the date property.
        data.url  = '/' + parts.name; // Set the URL for the post.

        // Jekyll uses layout property to apply a specific template to the file,
        // therefore this property's value must be duplicated in the
        // template property.
        data.template = data.layout + '.html';
      } else {
        destination = basename(file, extname(file)) + '/index.md';
      }

      if ('.' != dir) destination = dir + '/' + destination;

      delete files[file];
      files[destination] = data;
    });
  };
};
