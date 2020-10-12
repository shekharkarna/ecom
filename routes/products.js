const routes = require("express").Router();
const product = require("../controllers/products");

routes.get("/add", (req,res)=>{
	if(req.session.usertype !== "seller") {
		let redirect_path = "/d/"+req.session.usertype+"/"+req.session.username;
		res.redirect(redirect_path);
		return ;
	}

	res.render("add_products")
});

routes.post("/add",product.add );

routes.get("/id/:_id", product.get_details);

routes.get("/:category",product.get_by_category);

routes.get("/wishlist/:_id", product.wishlist);

routes.get("/getwishlist/:_id", product.getwishlist);
module.exports = routes;