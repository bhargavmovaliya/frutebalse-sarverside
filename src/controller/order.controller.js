const Orders = require("../models/orders.model");

const addorders = async (req, res) => {
    console.log("sdfdfd", req.body);
    try {
        const order = await Orders.create(req.body);
        console.log(order);
        if (!order) {
            res.status(400).json({
                success: false,
                message: 'category not created'
            })
        }
        res.status(201).json({
            success: true,
            message: 'order created successfully',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const getorder = async (req, res) => {
    try {
        const order = await Orders.findById(req.params.order_id)
        console.log(order);

        if (!order) {
            res.status(404).json({
                success: false,
                message: 'order not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'order found susscss',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const listorder = async (req, res) => {
    // console.log("listproduct");
    try {
        const order = await Orders.find();

        if (!order || order.length === 0) {
            res.status(404).json({
                success: false,
                message: 'order not found.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'product fetch susscss',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const updateorder = async (req, res) => {
    try {
        const order = await Orders.findByIdAndUpdate(req.params.order_id, req.body, { new: true, runValidators: true })
      console.log(order);
      
        if (!order) {
            res.status(400).json({
                success: false,
                message: 'order not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'order update successfully',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}
const deleteorders = async (req, res) => {

    try {
        const order = await Orders.findByIdAndDelete(req.params.order_id)

        if (!order) {
            res.status(404).json({
                success: false,
                message: 'order not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'order deleted successfully',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}
module.exports = {
    addorders,
    listorder,
    updateorder,
    deleteorders,
    getorder
}