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

It is very important to run `metalsmith-mallet` before `metalsmith-markdown` plugin. Otherwise your posts won't be processed.

### CLI Usage

Install via npm and then add the `metalsmith-mallet` key to your `metalsmith.json` plugins with a list of files you want to ignore, like so:

```js
{
  "plugins": {
    "metalsmith-mallet": {
      "ignore": ["example.md"]
    }
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

If there are Markdown files in your project's source directory that you don't want to process using `metalsmith-mallet`, specify them using `ignore` option.

```js
//...

Metalsmith(__dirname)
  .use(mallet({ ignore: ['example.md'] }))
  .use(markdown())
  .build();
```

In addition to properties defined in the YAML Front Matter metalsmith-mallet defines `url`, `date` and `collection`, so in a Handlebars template you can do something like this:

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

The `collection` property makes it easier to use `metalsmith-mallet` together with `metalsmith-collections` plugin. The value is identical to the `layout` property.

## TODO:

- Add an option to specify a different permalink format.

---

If you have any thoughts on this project, you can find me on Twitter as [@aigarsdz](http://twitter.com/aigarsdz).
