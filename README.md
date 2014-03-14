# metalsmith-jekyll-mapper

A Metalsmith plugin that allows to migrate Jekyll posts to Metalsmith without any additional changes.

This is a very early version of it, therefore it's not published on NPM yet, but I am going to do that very soon.

## Installation

Until I publish this plugin on NPM, the only way to install it in your project is by doing it manually. First you have to download the Zip file, and then run the following command from the root folder of your project.

    npm install ~/Downloads/metalsmith-jekyll-mapper


## CLI Usage

Comming soon...

## JavaScript Usage

```js
var mjm = require('metalsmith-jekyll-mapper'),
    markdown = require('metalsmith-markdown'),
    metalsmith = require('metalsmith');

Metalsmith(__dirname)
  .use(mjm())
  .use(markdown())
  .build();
```

## Important

This is temporary name for this plugin, therefore the name of this repository is going to change as well.

---

If you have any thoughts on this project, you can find me on Twitter as [@aigarsdz](http://twitter.com/aigarsdz).
