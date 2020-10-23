const User = require("../../Models/user");
const Seller = require("../../Models/seller");
const { encrypt, decrypt } = require('./crypto');

async function verifyBuyer(username, password){

	try{

		let doc  = await User.findById({_id: username});

		if(doc != null && doc.username == username && decrypt(doc.password) == password && doc.profileType == 1) {
			result =true;
			return true;
		}
		return false;

	}catch(err){
		console.log(err)
		return false;
	}
	
}

async function verifySeller(username, password){

	try{

		let doc  = await Seller.findById({_id: username});

		if(doc != null && doc.username == username && decrypt(doc.password) == password && doc.profileType == 2) {
			return true;
		}
		return false;

	}catch(err){
		console.log(err)
		return false;
	}
}

async function addBuyer(username,name,mobile,email,password){

	let doc  = await User.findById({_id: username});
	if(doc){
		return {status:true, insert: false} // user already exists with username
	}

	try{
		const buyer = new User({
			_id:username,
			name: name,
			username: username,
			mobile: mobile,
			email: email,
			password:  encrypt(password),
			profileType: 1
		})

		await buyer.save()
		return {status: false, insert: true}
	}catch(err){
		console.log(err)
	}
}

async function addSeller(username,name,mobile,email,password){
	
	let doc  = await Seller.findById({_id: username});
	if(doc){
		return {status:true, insert: false} // user already exists with username
	}

	try{
		const seller = new Seller({
			_id:username,
			name: name,
			username: username,
			mobile: mobile,
			email: email,
			password:  encrypt(password),
			profileType: 2
		})

		await seller.save();
		return {status: false, insert: true}

	}catch(err){
		console.log(err)
	}
}

module.exports = {
	verifyBuyer,
	verifySeller,
	addBuyer,
	addSeller,

}