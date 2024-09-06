const express = require('express');
const { cartControlle } = require('../../../controller');
const router = express.Router();

router.get(
    '/get-cart/:cart_id',
    cartControlle.getCart
)

// router.get(
//     '/get-cart',
//     cartControlle.getCart
// )

router.post(
    '/add-cart',
    cartControlle.addCarts
)

router.put(
    '/update-cart/:cart_id',
    cartControlle.updatecart
)
// router.put(
//     '/update-quantity/:cart_id',
//     cartControlle.updatequantity
// )

router.delete('/delete-cart/:cart_id/:product_id',
    cartControlle.deleteCartItem
);

module.exports = router;