const formidable = require("formidable");
const Products = require("../Models/products");
const api = require("./api/main");
const User = require("../Models/user");

function add(req,res){

	var form = formidable();

	form.parse(req,(err,field,files)=>{
		if(err){
			next(err)
			return 
		}

		if(api.add_product(req,field)){
			res.redirect("/products/add");
		}
		else{
			res.render("add_products");
		}
	});
	
};

async function fill_dashboard(req,res){
	if(req.session.loggedin ==true && req.session.username==req.params.user){
		let user = req.params.user;

		var x = await Products.find({}).limit(0);
		console.log(req.session.username)
		res.render("buyer_dashboard",{
			name: req.session.username,
			items: x,
		})
	}
	else{

		res.send("not logged in ")
	}
}

async function get_details(req,res){

	var x = await Products.find({_id: req.params._id})
	
	res.render("product_details",{
		item: x[0]
	})
}

function get_by_seller(req,res){
	
	if(req.session.loggedin && req.session.username===req.params.user && req.session.usertype == "seller"){
		
		var items = api.getProductBySeller(req.session.username);
		items
			.then(result => {
				let user = req.params.user;
				res.render("dashboard",{
					name: user, items: result
				})
			})
			.catch(err => console.log(err))

	}
	else{
		res.redirect("/");
		console.log("user unknown")
	}
}

function get_by_category(req,res){
	
	var items = api.getProductByCategory(req.params.category);
	items
		.then(result => {
			res.render("buyer_dashboard", {
				items: result
			})
		})
		.catch(err => console.log(err))

}

async function wishlist(req,res){

	let doc = await User.find({_id: req.session.username})
	let prearr = doc[0].wishlist;
	let x = prearr.indexOf(req.params._id);
	if(x==-1){
		await User.updateOne({_id: req.session.username}, {$push : {wishlist: req.params._id}});
	}
	else{
		await User.updateOne({_id: req.session.username}, {$pullAll: {wishlist: [req.params._id]}})
	}
	
	res.redirect("back")

}

async function getwishlist(req,res){
	console.log("in getwishlist")
	let doc = await User.find({_id: req.session.username})
	let arr = doc[0].wishlist;

	res.send(arr);
}

module.exports = {
	add, 
	fill_dashboard,
	get_details,
	get_by_seller,
	get_by_category,
	wishlist,
	getwishlist,
	};