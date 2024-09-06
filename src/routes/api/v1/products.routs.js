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

routes.delete('/delete-products/:product_id', 
    productsController.deleteproducts
)

routes.get('/getroductdata-by-subcategorydata/:subcategori_id',
    productsController.getproducttawith
)


routes.get('/search',
    productsController.searchName
)

routes.get('/list-category/:categori_id',
    productsController.productsByCategory
)

routes.get('/list-subcategory/:subcategori_id',
    productsController.productsBySubcategory

)

routes.get('/top-rated',
    productsController.topRate
)

routes.get( '/new-arrivals',
    productsController.newArrivals
)
routes.get('/count-categories',
    productsController.countCategories
)
routes.get('/discounts ',
    productsController.discount
)
// routes.get('/discounts',
//     productsController.discount
// )

module.exports = routes;