const formidable = require("formidable");
const User = require("../Models/user");
const Seller = require("../Models/seller");


function seller_login(req,res){

	const form = formidable()

	form.parse(req,(err,field,files)=>{
		if(err){
			next(err)
			return 
		}

		Seller.findById({_id:field.username}, (err,doc)=>{
			if(err) console.log(err)

			if(doc){
				req.session.loggedin = true;
				req.session.username = field.username;
				req.session.usertype = "seller";
				let redirect_path = "/d/seller/"+field.username;
				res.redirect(redirect_path)
			}
			else{
				res.render("seller_login",{
					error: "user doesnot exist"
				})
			}
		})
	})
}

function buyer_login(req,res){

	const form = formidable()

	form.parse(req,(err,field,files)=>{
		if(err){
			next(err);
			return;
		}

		User.findById({_id:field.username}, (err,doc) => {
			if(err) console.log(err);

			if(doc) {
				req.session.loggedin = true;
				req.session.username = field.username;
				req.session.usertype = "buyer";

				let redirect_path = "/d/buyer/"+field.username;
				res.redirect(redirect_path)
			}
			else{
				res.render("buyer_login",{
					error: "user doesnot exist"
				})
			}
		})
	})


}

function seller_signup(req,res){

	const form = formidable()

	form.parse(req,(err,field,files)=>{
		if(err){
			next(err);
			return 
		}

		Seller.findById({_id: field.username}, (err,doc)=>{

			if(err) console.log(err);

			if(doc) res.render("seller_signup", {error: "account already exists"})

			else{
				const seller = new Seller({
					_id: field.username,
					mobile: field.mobile,
					email: field.email,
					address: field.address,
				});

				seller
					.save()
					.then(result =>{
						req.session.loggedin = true;
						req.session.username = field.username;
						req.session.usertype = "seller";
						console.log("data Saved")
						let redirect_path = "/d/seller/" + field.username;
						res.redirect(redirect_path)
					})
					.catch(err => console.log(err))
			}
		})

	})
}

function buyer_signup(req,res){

	const form = formidable()

	form.parse(req,(err,field,files) =>{
		if(err){
			next(err)
			return
		}

		User.findById({_id: field.username}, (err,doc)=>{

			if(err) console.log(err);

			if(doc) res.render("buyer_signup",{
				error: "user already exists"
			})

			else{
				const buyer = new User({
					_id: field.username,
					mobile: field.mobile,
					email: field.email,
					address: field.address
				})

				buyer
					.save()
					.then(result =>{
						req.session.loggedin = true;
						req.session.username = field.username;
						req.session.usertype = "buyer";
						console.log("data saved ")
						let redirect_path = "/d/buyer/"+field.username;
						res.redirect(redirect_path);
					})
					.catch(err => console.log(err))
			}
		})

	})
}

function logout(req,res){
	req.session.loggedin = false;
	req.session.username = null;
	res.redirect("/");

}


module.exports = {

 	buyer_login,
 	seller_login,
 	buyer_signup,
 	seller_signup,
 	logout

 };