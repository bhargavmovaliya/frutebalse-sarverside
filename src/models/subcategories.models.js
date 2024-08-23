const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
    {
        category_id : {
            type : mongoose.Types.ObjectId,
            ref : "Categories",
            required  : true
        },
        name : {
            type : String,
            trim : true,
            lowercase : true,
            unique : true,
            required : true,
        },
        description : {
            type : String,
            trim : true,
            required : true,
        },
        image : {
            type : String,
            trim : true,
        },
        isActive : {
            type :Boolean,
            default : true
        }
    },
    {
        timestamps : true,
        versionKey : false
    }
)

const Subcategories = mongoose.model("Subcategories", subcategorySchema)
module.exports = Subcategories