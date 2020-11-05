const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Products = new Schema({
	name: String,
	brand: String,
	images: String,
	category: String,
	price: Number,
	rating: {type: Number, default: 0},
	comments: Array,
	description: String,
	quantity: Number,
	date: {type: Date, default: "2020-02-01"},
	seller: String,
});

module.exports = mongoose.model("products",Products);