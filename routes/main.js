const routes = require("express").Router();
const auth = require("./authenticate");
const dashboard = require("./dashboard");
const products = require("./products");
const product = require("../controllers/products");

routes.get("/", product.fill_homepage);

routes.use("/d", dashboard);

routes.use("/auth",auth);
routes.get("/test", product.fill_product_nth)
routes.use("/products", products);

module.exports = routes;