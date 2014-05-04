# metalsmith-mallet

A mallet is typically used to form sheet metal as well as for forcing tight-fitting parts together. The metalsmith-mallet plugin is used to force together [Metalsmith](http://www.metalsmith.io "Metalsmith") and [Jekyll](http://jekyllrb.com "Jekyll - Simple, blog-aware, static sites") or any other static site generator that uses Jekyll style posts.

I like the idea behind Metalsmith. It's simplicity and pluggable architecture is very alluring, but I am still a big fan of Jekyll, therefore I wanted an option to keep my posts unchanged so that I could use both of these tools to generate my blog.

## Installation

Install using NPM.

    npm install metalsmith-mallet

Or add to the *package.json* file.

```json
"dependencies": {
  "metalsmith-mallet": "*"
}
```

## Usage

It is very important to run `metalsmith-mallet` before any other plugins. Otherwise your posts might not be processed correctly.

### CLI Usage

Install via npm and then add the `metalsmith-mallet` key to your `metalsmith.json` plugins.

```js
{
  "plugins": {
    "metalsmith-mallet": true
  }
}
```

### JavaScript Usage

```js
var mallet     = require('metalsmith-mallet'),
    markdown   = require('metalsmith-markdown'),
    metalsmith = require('metalsmith');

Metalsmith(__dirname)
  .use(mallet())
  .use(markdown())
  .build();
```

### Ignore option

In case there are any posts that you don't want to process with `metalsmith-mallet`, you can specify them using `ignore` option.

```js
Metalsmith(__dirname)
    .use(mallet({ ignore: ["2014-04-05-random-post.md"] }))
    .use(markdown())
    .build();
```

### Collection option

`metalsmith-mallet` makes it easier to use `metalsmith-collections` plugin without changing the metadata of your posts by adding a `collection` property. The default value is the same as `layout`, but you can change it using `collection` option.

```js
Metalsmith(__dirname)
    .use(mallet({ collection: "articles" }))
    .use(markdown())
    .build();
```

In addition to properties defined in the YAML Front Matter metalsmith-mallet defines `url` and `date`, so in a Handlebars template you can do something like this:

```html
<time>{{ date }}</time>
<h1><a href="{{ url }}" title="{{ title }}">{{ title }}</a></h1>
```

The value for the date is taken from the post's file name, therefore it has a format of `yyyy-mm-dd`. If you want to change the format, you should define a helper function for that. If you are using Handlebars, the helper function might look something like this.

```js
Handlebars.registerHelper('localeDateFrom', function (dateString) {
    var date = new Date(dateString);

    return date.toLocaleDateString();
});
```

Then you can use this function in a template.

```html
<time>{{localeDateFrom date}}</time>
```

## TODO:

- Add an option to specify a different permalink format.

---

If you have any thoughts on this project, you can find me on Twitter as [@aigarsdz](http://twitter.com/aigarsdz).
