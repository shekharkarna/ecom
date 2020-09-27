const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var db = "mongodb://127.0.0.1:27017/newone";
mongoose.connect(db,{useUnifiedTopology: true, useNewUrlParser: true});

module.exports = db; // returns database connection object
