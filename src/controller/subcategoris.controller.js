const Subcategories = require("../models/subcategories.models");

const subcategorieslist = async (req, res) => {
    try {
        const subcategoris = await Subcategories.find();

        if (!subcategoris) {
            res.status(404).json({
                success: false,
                massage: "data is not found :" + error.message
            })
        }
        res.status(200).json({
            success: true,
            data: subcategoris
        })
        console.log(subcategoris);
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "internnet sarver error :" + error.massage
        })

    }
}

const getsubcategory = async (req, res) => {
    try {

        console.log(req.params.subcategory_id);

        const subcategores = await Subcategories.findById(req.params.subcategory_id);
        if (!subcategores || subcategores.length === 0) {
            res.status(404).json({
                success: false,
                massage: "data is not found :"
            })
        }
        res.status(200).json({
            success: true,
            data: subcategores
        })
        console.log(subcategores);
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "internnet sarver error :" + error.message
        })

    }
}

const getsubCategorybyCategory = async (req, res) => {
    try {

        console.log(req.params.subcategory_id);

        const subcategores = await Subcategories.find({ category_id: req.params.category_id });
        if (!subcategores || subcategores.length === 0) {
            res.status(404).json({
                success: false,
                massage: "data is not found :"
            })
        }
        res.status(200).json({
            success: true,
            data: subcategores
        })
        console.log(subcategores);
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "internnet sarver error :" + error.message
        })

    }
}

const addsubcategory = async (req, res) => {
    //console.log(req.body);
    try {

        const subcategores = await Subcategories.create(req.body);
        console.log(subcategores);

        if (!subcategores) {
            res.status(400).json({
                success: false,
                massage: "data is not found:"
            })


        }
        res.status(201).json({
            success: true,
            massage: "created sucses fully",
            data: subcategores
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "internnet sarver error :" + error.message
        })

    }
}
const putsubcategories = async (req, res) => {
    try {
        console.log("jddjdfn", req.params.subcategory_id);
        const subcategores = await Subcategories.findByIdAndUpdate(req.params.subcategory_id, req.body, { new: true, runValidators: true })
        console.log(subcategores);

        if (!subcategores) {
            res.status(400).json({
                success: false,
                message: "subcategores not update"
            })
        }

        res.status(200).json({
            success: true,
            message: "subcategores Updated  succesfully",
            data: subcategores
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}
const deletesubcategory = async (req, res) => {
    try {

        console.log(req.params.subcategorydelete_id);

        const subcategores = await Subcategories.findByIdAndDelete(req.params.subcategorydelete_id);
        if (!subcategores || subcategores.length === 0) {
            res.status(404).json({
                success: false,
                massage: "data is not found :" + error.massage
            })
        }
        res.status(200).json({
            success: true,
            data: subcategores
        })
        console.log(subcategores);
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "internnet sarver error :" + error.massage
        })

    }
}

const countactive = async (req, res) => {
    try {

        console.log(req.params.subcategory_id);

        const subcategores = await Subcategories.findById([
            
            {
                $match: {
                    isActive: true
                }
            },
            {
                $count: 'count'
            }
        
        ]);
        if (!subcategores || subcategores.length === 0) {
            res.status(404).json({
                success: false,
                massage: "data is not found :"
            })
        }
        res.status(200).json({
            success: true,
            data: subcategores
        })
        console.log(subcategores);
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "internnet sarver error :" + error.message
        })

    }
}
module.exports = {
    subcategorieslist,
    getsubcategory,
    addsubcategory,
    putsubcategories,
    deletesubcategory,
    getsubCategorybyCategory,
    countactive,
    
}