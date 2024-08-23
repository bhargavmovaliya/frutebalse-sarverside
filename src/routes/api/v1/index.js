const express = require("express");

const routes = express.Router();

const categoriesRoute = require("./categories.routs");
const subcategoriesRoute = require("./subcategories.routs");
const productsRoute = require("./products.routs");
const variantsRoute = require("./variants.rotes");
const salespeopleRoute = require("./salespeople.routs")
const usersRoute  = require("./users.routes");

routes.use("/categories", categoriesRoute)
routes.use("/subcategories", subcategoriesRoute)
routes.use("/products",productsRoute)
routes.use("/variant",variantsRoute)
routes.use("/salespeople",salespeopleRoute)
routes.use("/users",usersRoute)
module.exports = routes;


