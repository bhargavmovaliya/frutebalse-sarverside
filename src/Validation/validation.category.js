const Joi = require("joi");

const getCategory = {
    query: Joi.object().keys({
        cat_id: Joi.string().required().max(24)
    })
}
const addCategory = {
    body: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        discription: Joi.string().required().max(100),
        image: Joi.string().allow(''),
    })
}
const updateCategory = {
    body: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        discription: Joi.string().required().max(1000),
        image: Joi.string().allow(''),
    }),
    params: Joi.object().keys({
        category_id: Joi.string().required()
    })
}

const deleteCategory = {
    params: Joi.object().keys({
        category_id: Joi.string().required().max(24)
    })
}
module.exports = {
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}