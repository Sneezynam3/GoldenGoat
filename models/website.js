var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var NewsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    Summary: {
        type: String
    },

    link: {
        type: String,
        unique: true
    },

    Saved: {
        type: Boolean,
        default: false
    },

    Comments: {
        type: String,
        default: ""
    }

});
var news = mongoose.model("news", NewsSchema);
module.exports = news;