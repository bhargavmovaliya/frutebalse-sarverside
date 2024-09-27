const express = require("express");

const routes = express.Router();

const categoriesRoute = require("./categories.routs");
const subcategoriesRoute = require("./subcategories.routs");
const productsRoute = require("./products.routs");
const variantsRoute = require("./variants.rotes");
const salespeopleRoute = require("./salespeople.routs")
const usersRoute  = require("./users.routes");
const cartRoute  = require("./cart.rotes");
const reviewRoute  = require("./review.routes");
const OrderRoute  = require("./order.routes");


routes.use("/users", usersRoute)
routes.use("/categories", categoriesRoute)
routes.use("/subcategories", subcategoriesRoute)
routes.use("/products",productsRoute)
routes.use("/variant",variantsRoute)
routes.use("/salespeople",salespeopleRoute)
routes.use("/carts",cartRoute)
routes.use("/reviews",reviewRoute)
routes.use("/orders",OrderRoute)

module.exports = routes;
