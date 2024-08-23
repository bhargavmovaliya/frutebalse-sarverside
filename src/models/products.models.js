const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: "Categories",
            require:true
            
        },

        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: "Subcategories",
            require:true

        },
        name: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            require:true

        },
        prodact_img:{
            type: {
                public_id: String,
                url:String
             }
             
         },
        price: {
            type: Number,
           
        },
        stock: {
            type: Number,
       
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

const Products = mongoose.model("Products", productSchema)
module.exports = Products