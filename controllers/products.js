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
	console.log(req.query);
	if(true || req.session.loggedin ==true && req.session.username==req.params.user){
		let user = req.params.user;
		var x = await Products.find({}).limit(3);
		var count = await Products.find({}).countDocuments();
		count = Math.ceil(count/3);
		
		res.render("temp",{
			name: "shekhar",
			items: x,
			count: count,
		})
	}
	else{
		res.redirect("/")
	}
}

async function fill_product_nth(req,res) {
	const page = req.params.page;
	const limit = 3;
	let user = await Products.find({})
								.limit(limit*1)
								.skip((page-1)*limit)
								.exec();
	res.json(user);

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


module.exports = {
	add,
	fill_dashboard, 
	get_details,
	fill_product_nth,
	getProductByCategory,
};