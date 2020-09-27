const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Seller = new Schema({
	_id: String,
	mobile: String,
	email: String,
	address: String,
	products: String,
});

module.exports = mongoose.model("seller", Seller);