$(document).ready(function(){
	
	//$("[data-toggle="tooltip"]").tooltip();

	$(".material-icons").click(togglewishlist)

	let x = $.get()
	$.ajax({
		method: "GET",
		url: `/products/getwishlist/${this.body.id}`
	})
	.done(function(data){
		//console.log(data)
		data.forEach((id)=>{
			$(`#${id}`).css("color","blue");
			//console.log(id)
		})
	})
	//console.log(x)
})

function togglewishlist(){
	//console.log(this.id)
	$.get(`/products/wishlist/${this.id}`);
	let x = $(`#${this.id}`).css("color")
	//console.log(x)
	//console.log(x=="rgb(0, 0, 255)")
	//console.log(typeof(x))

	if(x =="rgb(0, 0, 255)"){
		$(`#${this.id}`).css("color","rgb(128,128,128)");
	}
	else{
		$(`#${this.id}`).css("color","rgb(0,0,255)");
	}

}