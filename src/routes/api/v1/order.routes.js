const express = require('express');
const { OrderControler } = require('../../../controller');



const router = express.Router();

router.get(
    "/list-order",
    OrderControler.listorder
)

router.get('/get-order/:order_id',
    OrderControler.getorder
);

router.post(
    "/add-order",
    OrderControler.addorders
)

router.put(
    "/update-order/:order_id",
    OrderControler.updateorder
)

router.delete(
    "/delete-order/:order_id",
    OrderControler.deleteorders
)


module.exports = router;