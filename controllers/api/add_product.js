const Products = require("../../Models/products");

function add_product(req,field){

	const newproduct = new Products({
			name: field.item_name,
			brand: field.brand,
			images: field.image,
			category: field.category,
			price: parseInt(field.price),
			rating: 0,
			description: field.description,
			quantity: parseInt(field.quantity),
			seller: req.session.username,

	});

	newproduct
		.save()
		.then(result =>{
			console.log("product added");
			return true ;
		})
		.catch(err =>{
			console.log(err);
			return false;
		})
};

module.exports = add_product;