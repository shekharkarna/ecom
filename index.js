const express = require("express");
var db = require("./dbconfig");
var routes = require("./routes/main");
var session = require("express-session");

const app = express();
console.log(db)

app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/",routes)

app.listen(3000,()=>{
	console.log("runing at 3000");
})