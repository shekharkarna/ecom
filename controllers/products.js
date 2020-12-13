const formidable = require("formidable");
const Products = require("../Models/products");
const api = require("./api/main");

async function add(req,res){

	var form = formidable();

	form.parse(req,async (err,field,files)=>{
		if(err){
			next(err)
			return 
		}
		let status = await api.add_product(req.session.username,
									field.item_name,
									field.brand,
									field.image,
									field.category,
									field.price,
									field.description,
									field.quantity 
									)
		if(status){
			res.redirect("back");
		}
		else{
			res.render("add-product");
		}
	});
	
};

async function fill_dashboard(req,res){

	console.log(req.url);

	let page = req.query.page;
	console.log(page);
	let limit = 4;
	var items = await Products.find({})
								.limit(limit)
								.skip((page-1)*limit)
								.exec();

	var count = await Products.find({}).countDocuments();
	res.render("product_list",{
		url : req.url,
		items: items,
		count: Math.ceil(count/4),
	})
}

async function get_details(req,res){

	var x = await Products.find({_id: req.params._id})
	res.render("product_details",{
		item: x[0]
	})
}

async function getProductByCategory(req,res) {
	//type is req.params.type
	let items = await api.getProductByCategory(req.params.type)
	var count = await Products.find({category: req.params.type}).countDocuments();

	res.render("product_list",{
		items: items,
		count: Math.ceil(count/3),
	})
}

async function fill_homepage(req,res){

	var x = await Products.find().limit(6)

	console.log (x.length)

	for(var i=0; i<x.length; i++){
		console.log(x[i])
	}

	res.render("index", {
		items: x
	})
}



module.exports = {
	add,
	fill_dashboard, 
	get_details,
	fill_product_nth,
	getProductByCategory,
	fill_homepage,
};