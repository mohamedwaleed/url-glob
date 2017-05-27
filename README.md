# url-glob
Javascript library for url globing.
Easier than regex string matching patterns for urls.

[![Build Status](https://travis-ci.org/mohamedwaleed/url-glob.svg?branch=master)](https://travis-ci.org/mohamedwaleed/url-glob)


How to use :
---------------

```````````````
var UrlGlob = require('url-glob');
var urlGlob = new UrlGlob('**');
urlGlob.match('http://google.com.eg'); // take a url and returns true or false
```````````````
Matching symbols :
---------------
1- * : maching zero or more characters
2- ** : matching zero or more url part (e.g /example/)