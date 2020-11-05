const routes = require("express").Router();
const verify = require("../controllers/auth");

routes.get("/seller_login",(req,res)=>{

	res.render("seller_login",{
		error: ""
	})
});

routes.post("/seller_login",verify.seller_login);

routes.get("/buyer_login",(req,res)=>{
	res.render("buyer_login",{
		error: ""
	})
});

routes.post("/buyer_login",verify.buyer_login);

// SIGNUP ROUTES

routes.get("/buyer_signup",(req,res)=>{
	res.render("buyer_signup",{
		error:""
	})
});

routes.post("/buyer_signup",verify.buyer_signup)

routes.get("/seller_signup",(req,res)=>{
	res.render("seller_signup",{
		error:""
	})
});

routes.post("/seller_signup", verify.seller_signup)
routes.get("/logout",verify.logout)

module.exports = routes;