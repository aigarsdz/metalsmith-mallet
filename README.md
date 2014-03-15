# metalsmith-mallet

A mallet is typically used to form sheet metal as well as for forcing tight-fitting parts together. The metalsmith-mallet plugin is used to force together [Metalsmith](http://www.metalsmith.io "Metalsmith") and [Jekyll](http://jekyllrb.com "Jekyll - Simple, blog-aware, static sites") or any other static site generator that uses Jekyll style posts.

I like the idea behind Metalsmith. It's simplicity and pluggable architecture is very alluring, but I am still a big fan of Jekyll, therefore I wanted an option to keep my posts unchanged so that I could use both of these tools to generate my blog.

## Installation

Until I publish this plugin on NPM, the only way to install it in your project is by doing it manually. First you have to download the Zip file, and then run the following command from the root folder of your project.

    npm install ~/Downloads/metalsmith-jekyll-mapper


## Usage

It is very important to run metalsmith-mallet before metalsmith-mallet plugin. Otherwise your posts won't be processed.

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

## TODO:

- Add an option to specify a different permalink format.

---

If you have any thoughts on this project, you can find me on Twitter as [@aigarsdz](http://twitter.com/aigarsdz).
