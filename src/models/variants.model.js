
const mongoose = require('mongoose');


const variantSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            require: true,
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Subcategories',
            require: true
        },
        price: {
            type: Number
        },
        stock: {
            type: Number
        },
        discount: {
            type: Number
        },
        attributes: {},
        variants_img: {
            type: {
                public_id: String,
                url: String
            }

        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Variants = mongoose.model('Variants', variantSchema)
module.exports = Variants