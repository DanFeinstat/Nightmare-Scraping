var jquery = require("jquery");
// jquery allows easy selection of css/html elements in the dom
var Nightmare = require("nightmare"),
  nightmare = Nightmare({ show: true });
// nightmare is a simple wrapper for PhantomJS for testing, web automation and scraping

nightmare
  .goto("https://www.nytimes.com/")
  // go to nytimes website
  .evaluate(function() {
    var stories = [];
    // create an array to hold all headlines and links on front page
    $(`.story-heading`).each(function() {
      item = {};
      item["title"] = $(this).text();
      item["link"] = $(this)
        .children()
        .attr("href");
      stories.push(item);
    });
    return stories;
    // pass the stories array forward to use as you'd like
  })
  .end()
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });
