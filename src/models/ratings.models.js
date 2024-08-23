const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        rating : {
            type: Number,
            trim: true,
            required: false
        },
        review: {
            type: String,
            trim: true,
            required: false
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

const Ratings = mongoose.model("Ratings", ratingsSchemaa);
module.exports = Ratings;