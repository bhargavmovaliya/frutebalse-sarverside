const express = require('express')
const upload = require('../../../middel_vare/uplode')
const { variantsControlle } = require('../../../controller')
const router = express()

router.get(
    '/list-variant',
    variantsControlle.listVariants
)

router.get(
    '/list-variant/:variant',
    variantsControlle.getVariant
)

// router.get(
//     '/list-subcategory-by-category/:category_id',
//     variantsControlle.getSubcategory
// )

// router.get(
//     '/list-product-by-subcategory/:subcategory_id',
//     variantsControlle.getProductSelect
// )

router.post(
    '/add-variant',
    upload.single('img'),
    variantsControlle.addVariant
)

router.put(
    '/update-variant/:variant_id',
    variantsControlle.updateVariant
)

router.delete(
    '/delete-variant/:variant_id',
    variantsControlle.deleteVariant
)

module.exports = router