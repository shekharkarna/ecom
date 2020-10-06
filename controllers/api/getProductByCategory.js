const Products = require("../../Models/products");

async function getProduct(type){

	try{
		const result = await Products.find({category: type});
		return result;
	}
	catch(err){
		console.log(err)
	}
}

module.exports = getProduct;