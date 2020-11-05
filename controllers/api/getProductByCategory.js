const Products = require("../../Models/products");

async function getProduct(type,limit = 0){

	try{
		const result = await Products.find({category: type}).limit(limit);
		return result;
	}
	catch(err){
		console.log(err)
	}
}

module.exports = getProduct;