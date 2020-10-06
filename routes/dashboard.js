const routes = require("express").Router();
const product = require("../controllers/products");
const api = require("../controllers/api/main");

routes.get("/",(req,res)=>{
	let redirect_path = "/d/"+req.session.usertype+"/"+req.session.username;

	res.redirect(redirect_path);
});

routes.get("/seller/:user",product.get_by_seller);

routes.get("/buyer/:user", product.fill_dashboard);

module.exports = routes;