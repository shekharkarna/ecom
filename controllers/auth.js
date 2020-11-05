const formidable = require("formidable");
const users = require("./api/users")

async function seller_login(req,res){

	const form = formidable()

	form.parse(req,async function(err,field,files){
		if(err){
			next(err)
			return 
		}

		var result = await users.verifySeller(field.username, field.password)

		if(result){
			req.session.loggedin = true;
			req.session.username = field.username;
			req.session.usertype = "seller";
			let redirect_path = "/d/seller/"+field.username;
			res.redirect(redirect_path)
		}
		else{
			res.render("seller_login",{
				error: "User already exists"
			})
		}
	})
}

async function buyer_login(req,res){

	const form = formidable()

	form.parse(req,async function(err,field,files){
		if(err){
			next(err);
			return;
		}
		
		var result = await users.verifyBuyer(field.username, field.password)
		
		if(result){
			req.session.loggedin = true;
			req.session.username = field.username;
			req.session.usertype = "buyer";
			let redirect_path = "/d/buyer";
			res.redirect(redirect_path);

		}
		else{
			res.render("buyer_login", {
				error: "Please enter valid username and password."
			})
		}

	})

}

async function seller_signup(req,res){

	const form = formidable()

	form.parse(req,async function(err,field,files){
		if(err){
			next(err)
			return
		}

		var result = await users.addSeller(field.username,field.name, field.mobile,field.email,field.password)

		if(result.insert){
			req.session.loggedin = true;
			req.session.username = field.username;
			req.session.usertype = "seller";
			console.log("data saved ")
			let redirect_path = "/d/seller/"+field.username;
			res.redirect(redirect_path);
		}
		else{
			res.render("seller_signup",{
				error: "Please enter valid username and password."
			})
		}

	})
}

async function buyer_signup(req,res){

	const form = formidable()

	form.parse(req,async function(err,field,files){
		if(err){
			next(err)
			return
		}

		var result = await users.addBuyer(field.username,field.name, field.mobile,field.email,field.password)

		if(result.insert){
			req.session.loggedin = true;
			req.session.username = field.username;
			req.session.usertype = "buyer";
			console.log("data saved ")
			let redirect_path = "/d/buyer/"+field.username;
			res.redirect(redirect_path);
		}
		else{
			console.log("failed")
			res.redirect("back")
		}
	})
}


function logout(req,res){
	req.session.loggedin = false;
	req.session.username = null;
	res.redirect("back");

}


module.exports = {

 	buyer_login,
 	seller_login,
 	buyer_signup,
 	seller_signup,
 	logout

 };