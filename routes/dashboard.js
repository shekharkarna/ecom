const routes = require("express").Router();
const product = require("../controllers/products");
const api = require("../controllers/api/main");

routes.get("/",(req,res)=>{
	let user = req.session.username;
	let redirect_path = "/d/"+req.session.usertype;
	res.redirect(redirect_path);
});

routes.get("/seller/:user",(req,res)=>{

	if(req.session.loggedin==true && req.session.username===req.params.user){
		if(req.session.usertype !== "seller"){
			res.render("/");
			return;
		};
		var items = api.getProductBySeller(req.session.username);

		items
			.then(result =>{
				let user = req.params.user;
				res.render("add_products",{
					name: user, items: result
				})
			})
			.catch(err => console.log(err))
	}
	else{
		res.send("not logged in ");
	}

})

routes.get("/adminproducts/",(req,res)=>{
	if(req.session.loggedin==true){
		if(req.session.usertype !== "seller"){
			res.render("/");
			return;
		};
		var items = api.getProductBySeller(req.session.username);

		items
			.then(result =>{
				let user = req.params.user;
				res.render("admin_products",{
					name: user, items: result
				})
			})
			.catch(err => console.log(err))
	}
	else{
		res.send("not logged in ");
	}

})

routes.get("/buyer", product.fill_dashboard);
routes.get("/page/:page",product.fill_product_nth);

module.exports = routes;