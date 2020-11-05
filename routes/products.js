const routes = require("express").Router();
const product = require("../controllers/products");

routes.get("/add", (req,res)=>{
	if(req.session.usertype !== "seller") {
		res.redirect(`/d/${req.session.usertype}/${req.session.username}`);return 
	}

	res.render("add-product")
});

routes.post("/add",product.add );

routes.get("/type/:type", product.getProductByCategory)

routes.get("/id/:_id", product.get_details);

module.exports = routes;