const Products = require("../../Models/products");

async function search_results(pat){
	
	try{
		let result = await Products.find({name: {$regex: pat}}, "name ").limit(4)
		console.log(result);
		return result;
	}catch(err){
		console.log(err)
	}
}

module.exports = {
	search_results,
};