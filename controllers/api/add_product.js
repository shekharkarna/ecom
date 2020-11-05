const Products = require("../../Models/products");

async function add_product(seller_name,name,brand,images,category,price,description,quantity){

	const newproduct = new Products({
			name: name,
			brand: brand,
			images: image,
			category: category,
			price: parseInt(price),
			description: description,
			quantity: parseInt(quantity),
			seller: seller_name,
			date: new Date(),

	});

	try{
		await newproduct.save()
		console.log("product added");
		return true
	}catch(err){
		console.log(err);
	}
};

module.exports = add_product;