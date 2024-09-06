const express = require("express");
const { subcategoriescontroller } = require("../../../controller");

const routes = express.Router();

routes.get('/subcategorieslist', 
subcategoriescontroller.subcategorieslist

)
routes.get('/getsubcategories/:subcategory_id', 
subcategoriescontroller.getsubcategory
)

routes.get('/getsubCategorybyCategory/:category_id', 
    subcategoriescontroller.getsubCategorybyCategory
)

routes.post('/add-subcategories',
subcategoriescontroller.addsubcategory

)
routes.put('/put-subcategories/:subcategory_id',
subcategoriescontroller.putsubcategories
)
routes.get('/getsubcategoridata-by-categorydata/:categori_id',
    subcategoriescontroller.getsubcategoridatawith
)


routes.get("/inactive",
    subcategoriescontroller.inactivesubcategory
)

routes.get('/parent-of-subcategory/:categori_id',
    subcategoriescontroller.subcategorioncategory
)

routes.get('/count-active',
    subcategoriescontroller.activesubcategory
)

routes.get('/most-products',
    subcategoriescontroller.highestcategori
)
routes.get('/count-products',
    subcategoriescontroller.productwithsubcategori
)
module.exports = routes;