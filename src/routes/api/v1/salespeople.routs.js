const express = require('express');
const { salespeoleControlle } = require('../../../controller');

const router = express.Router();

router.get(
    '/list-salespeople',
    salespeoleControlle.listSales
);

router.post(
    '/add-salesperson',
    salespeoleControlle.insertSales
);

router.delete(
    '/delete-salesperson/:snum',
    salespeoleControlle.deleteSales
);

router.put(
    '/update-salesperson/:snum',
    salespeoleControlle.updateSales
)

module.exports=router;
