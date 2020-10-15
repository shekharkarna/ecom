const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Seller = new Schema({
	_id: String,
	name: String,
	username: String,
	mobile: Number,
	email: String,
	address: String,
	password: Object,
	profileType: Number,
	products: String,
});

module.exports = mongoose.model("seller", Seller);