const express = require("express");
const { productsController } = require("../../../controller");
const upload = require("../../../middel_vare/uplode");

const routes = express.Router();

//localhost:3000/api/v1/products/list-products
routes.get(
    '/list-products',
    productsController.listproducts,
    
)



routes.post(
    '/add-products', 
    upload.single('prodact_img'),
    productsController.addproducts
)

routes.put(
    '/update-products/:product_id', 
    upload.single('prodact_img'),
    productsController.updateproducts
)

routes.delete(
    '/delete-products/:product_id', 
    productsController.deleteproducts
)

routes.get(
    '/products-list/category_id', 
    productsController.prodactlistcategory
)

routes.get(
    '/top-rated', 
    productsController.toprated
)
routes.get(
    '/arrivals', 
    productsController.arrivals
)
routes.get(
    '/discount', 
    productsController.discount
)
routes.get(
    '/searchName', 
    productsController.searchName
)
routes.get(
    '/productsByCategory', 
    productsController.productsByCategory
)
routes.get(
    '/productsBySubcategory', 
    productsController.productsBySubcategory
)

routes.get('/searchprodact',
    productsController.searchprodact
)
module.exports = routes;