//Dependencies
var express = require("express");
var express_handlebars = require("express-handlebars");

//Require mongoose 
var mongoose = require("mongoose");

//boiler plate
var app = express();
var PORT = process.env.PORT || 8080;
app.engine('handlebars', express_handlebars( {defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/GoldenGoat";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//===================================================
require("./routes/routes")(app);


app.get("/all", function(req, res) {
    db.scrapedData.find({}, function(err, found) {
      if (eff) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  });
  


app.get("/scrape", function(req, res){
    request("https://seekingalpha.com/market-news/", function(error, response, html){
        var $ = cheerio.load(html);

        $(".title").each(function(i, element){
            var title = $(this).children("a").text();
            var link = $(this).children("a").attr("href");
            
            if (title && link) {
                db.scrapedData.save({
                    title: title,
                    link: link
                }),
                function(error, saved) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(saved);
                    }
                }
            }
        })

    })
    res.send("Scrape complete");
});








app.listen(PORT, function(){
    console.log("listening on PORT: " + PORT)
})