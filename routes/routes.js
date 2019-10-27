var axios = require("axios");
var cheerio = require("cheerio");
var latestNews = require("../models/website.js");
module.exports = function (app) {
    //routes go here
    app.get("/", function(req, res) {
        res.render("index")
    });
};