connect-four
============
Fun little connect-four game build on [Grunt](http://gruntjs.com/getting-started)

Getting started
------------
To get started, run `npm install` in your favorite terminal, then run `grunt build`

Grunt tasks
------------
- `grunt build` - Build for packaging
- `grunt buildcss` - Convert SASS to CSS, cleanup CSS, Minify
- `grunt buildhtml` - HTML Linting
- `grunt buildjs` - Combine & Minify, run Jasmine testing suite
- `grunt watch` - Watch for changes and run proper task collection automatically


Output
-----------
Output will always be in your `/build` folder, be sure to point your server to that folder.
