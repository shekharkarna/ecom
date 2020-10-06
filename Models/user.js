const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
	_id: String,
	mobile: String,
	email: String,
	address: String,
	wishlist: Array,
});

module.exports = mongoose.model("user",User);