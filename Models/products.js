const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Products = new Schema({
	name: String,
	brand: String,
	images: String,
	category: String,
	price: Number,
	rating: Number,
	comments: JSON,
	description: String,
	quantity: Number,
	seller: String,
});

module.exports = mongoose.model("products",Products);