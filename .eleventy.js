const moment = require('moment');
const _ = require("lodash");
moment.locale('en');


module.exports = function(eleventyConfig) {


  // Time
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

 
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
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
  };



