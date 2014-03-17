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

It is very important to run metalsmith-mallet before metalsmith-markdown plugin. Otherwise your posts won't be processed.

### CLI Usage

Comming soon...

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

If there are Markdown files in your project's source directory that you want to process using metalsmith-mallet, specify them using `ignore` option.

```js
//...

Metalsmith(__dirname)
  .use(mallet({ ignore: ['example.md'] }))
  .use(markdown())
  .build();
```

## TODO:

- Add an option to specify a different permalink format.

---

If you have any thoughts on this project, you can find me on Twitter as [@aigarsdz](http://twitter.com/aigarsdz).
