const express = require("express");
const { categoriescontroller } = require("../../../controller");
const Categories = require("../../../models/categories.models");
const { validation } = require("../../../middel_vare/validation");
const { categorycreate } = require("../../../Validation");
const auth = require("../../../middel_vare/auth");

const routes = express.Router();

routes.get('/categories-list',  
//    auth("admin","user"),
    categoriescontroller.listcategories,
   
)

routes.post('/categories-add',
    validation(categorycreate.categorycreat),
    // upload.single('category_img'),
    categoriescontroller.addcategories

)

routes.put('/categories-update/:category_id',
    validation(categorycreate.categoriesput),
    
    categoriescontroller.updatecategories
)

routes.delete('/categories-delete/:category_id',
    validation(categorycreate.categoriesdelete),
    categoriescontroller.deletecategories
)

routes.get(
    '/count-active',  

    categoriescontroller.countallnuer

)
routes.get(
    '/most-products',
    categoriescontroller.mostprodact
)
routes.get(
    '/total-prodact',
    categoriescontroller.totalproduct
)
routes.get(
    '/total-prodact',
    categoriescontroller.totalproduct
)
routes.get(
    '/inActive',
    categoriescontroller.inActive
)
routes.get(
    '/countsubcategories',
    categoriescontroller.countsubcategories
)
module.exports = routes;