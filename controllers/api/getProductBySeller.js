const Products = require("../../Models/products");

async function getProduct(name){

	try{
		const result = await Products.find({seller: name});
		return result;
	}
	catch(err){
		console.log(err)
	}

}

module.exports = getProduct;