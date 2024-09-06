const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    }
)

const cartschema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        items: [itemSchema],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const Carts = mongoose.model('Carts', cartschema)

module.exports = Carts