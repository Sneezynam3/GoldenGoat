//Require axios and cheerio
var axios = require("axios");
var cheerio = require("cheerio");
var latestNews = require("../models/website.js");

module.exports = function (app) {
    //routes go here
    app.get("/", function(req, res) {
        res.render("index")
    });
    
    // A GET route for scraping the echoJS website
    app.get("/scrape", function(req, res) {
        
        // First, we grab the body of the html with axios
        axios.get("https://old.reddit.com/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);
            
            $(".thing").each(function(i, element) {
                // Save an empty result object
                var result = {};     
                
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(element).find("a.title").text();
                
                result.link = $(this).find("a.title").attr("href");
                
                result.img =  $(this).find("img").attr("src");  
                
                
                console.log(result)
                // Create a new Article using the `result` object built from scraping
                
                latestNews.create(result)      
          .then(function(dbArticle) {
            
                console.log(dbArticle);
              })
              .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
          });
    });
    // Send a message to the client
      res.send("Scrape Complete");
    });
});
};