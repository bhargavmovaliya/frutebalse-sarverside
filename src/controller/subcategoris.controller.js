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
const subcategorioncategory = async (req, res) => {
    const subcategories = await Subcategories.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "categori_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $project: {
                "name": 1,
                "category": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);

}
const getsubcategoridatawith = async (req, res) => {
    try {
        const subcaregori = await Subcategories.find({ categori_id: req.params.categori_id })

        if (!subcaregori) {
            res.status(404).json({
                success: false,
                message: 'subcaregori not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'subcaregori found susscss',
            data: subcaregori
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const activesubcategory = async (req, res) => {

    const activesubcategori = await Subcategories.aggregate([
        {
            $match: {
                isActive: true
            }
        },
        {
            $count: 'isActivenumofsubcategory'
        }

    ]);
    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: activesubcategori
    })

    console.log(activesubcategori);
}

const highestcategori = async (req, res) => {
    const subcategories = await Subcategories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "subcategori_id",
                as: "product"
            }
        },
        {
            $match: {
                "product": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "subcategory_name": { $first: "$name" },
                "CountProduct": {
                    $sum: 1
                },
                "product_name": { $push: "$product.name" }
            }
        },
        {
            $sort: {
                "CountProduct": -1
            }
        },
        {
            $limit: 5
        }

    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);
}


const inactivesubcategory = async (req, res) => {
    const inactivesubcategori = await Subcategories.aggregate([
        // {
        //     $match: {
        //         isActive: false
        //     }
        // },
        // {
        //     $project: {
        //         _id: 1,
        //         name: 1, 
        //         // Add more fields as needed
        //     }
        // }
        {
            $match: {
                isActive: false
            }
        },
        {
            $project: {
                _id: 1,
                name: 1, 
                
            }
        }
    ]);
    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: inactivesubcategori
    })
    console.log(inactivesubcategori);
}

const productwithsubcategori = async (req, res) => {
    const subcategories = await Subcategories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "subcategori_id",
                as: "product"
            }
        },
        {
            $match: {
                "product": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "subcategory_name": { $first: "$name" },
                "CountProduct": {
                    $sum: 1
                },
                "product_name": { $push: "$product.name" }
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);
}


module.exports = {
    subcategorieslist,
    getsubcategory,
    addsubcategory,
    putsubcategories,
    deletesubcategory,
    activesubcategory,
    inactivesubcategory,
    subcategorioncategory,
    highestcategori,
    productwithsubcategori,
    subcategorioncategory,
    getsubcategoridatawith,
    getsubCategorybyCategory
    
}