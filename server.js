//setting up connection
var express = require("express");
var express_handlebars = require("express-handlebars");
var mongoose = require("mongoose");

//boiler plate
var app = express();
var PORT = process.env.PORT || 8080;
app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
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
app.listen(PORT, function(){
    console.log("listening on PORT: " + PORT)
})