const formidable = require("formidable");
const Products = require("../Models/products");
const api = require("./api/main");

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
		
		res.render("buyer_dashboard",{
			name: "shekhar",
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


module.exports = {add, fill_dashboard, get_details};