const routes = require("express").Router();
const auth = require("./authenticate");
const dashboard = require("./dashboard");
const products = require("./products");

routes.get("/",(req,res)=>{
	res.render("index");
});

routes.use("/d", dashboard);

routes.use("/auth",auth);

routes.use("/products", products);

var test = "product_list"
routes.get("/test",(req,res)=>{
	console.log(req.session.loggedin)
	res.render(test,{
		items: "one"
	})
})

module.exports = routes;