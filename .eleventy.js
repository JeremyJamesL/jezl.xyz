const moment = require('moment');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require('html-minifier');
const _ = require("lodash");
moment.locale('en');


module.exports = function(eleventyConfig) {
  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function(content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
  // Time
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  // Readable date fron frontmatter
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  // Add excerpt support
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->"
  });

  eleventyConfig.addCollection("postsByYear", (collection) => {
    return _.chain(collection.getFilteredByTags("post"))
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  eleventyConfig.addCollection("projectsByYear", (collection) => {
    return _.chain(collection.getFilteredByTags("projects"))
      .groupBy((project) => project.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  // Pass throughs
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("index.js");
  eleventyConfig.addPassthroughCopy("assets/favicon");
  eleventyConfig.addPassthroughCopy("assets/docs");
  eleventyConfig.addPassthroughCopy("assets/images");
  };



