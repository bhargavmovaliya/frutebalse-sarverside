const Products = require("../models/products.models");
const { Uplodfolder } = require("../utliy/cloudinary");

const listproducts = async (req, res) => {
    try {
        const products = await Products.find();

        if (!products || products.length === 0) {
            res.status(404).json({
                success: false,
                message: "Products not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Products fetched sucessfully",
            data: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}
const getproducts = async (req, res) => {
    try {
        console.log(req.params.product_id);

        const product = await Products.findById(req.params.product_id);
        console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product fetched sucessfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}
const addproducts = async (req, res) => {
    try {
        console.log("jjjjjjjjjjjjjjjjjjj", req.file);
        console.log(req.body);
        const fileRes = await Uplodfolder(req.file.path, "prodact");
        console.log(fileRes);
        const product = await Products.create({
            ...req.body,
            prodact_img: {
                public_id: fileRes.public_id,
                url: fileRes.url
            }
        });
        console.log(product);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not creted"
            })
        }
        res.status(201).json({
            success: true,
            message: "Product careted sucessfully",
            data: product
        })
        return Uplodfolder
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const deleteproducts = async (req, res) => {
    try {
        console.log(req.params.product_id);

        const product = await Products.findByIdAndDelete(req.params.product_id);
        console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted sucessfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}
const updateproducts = async (req, res) => {
    // try {
    console.log("dddd", req.params.product_id, req.body, req.file);
    if (req.file) {
        console.log("new");
        try {

            console.log("jjjjjjjjjjjjjjjjjjj", req.file);

            console.log(req.body);

            const fileRes = await Uplodfolder(req.file.path, "prodact");

            console.log(fileRes);

            const product = await Products.findByIdAndUpdate(req.params.product_id,
                {
                    ...req.body,
                    prodact_img: {
                        public_id: fileRes.public_id,
                        url: fileRes.url
                    }

                });
            console.log(product);

            if (!product) {
                res.status(400).json({
                    success: false,
                    message: "Product not creted"
                })
            }

            res.status(201).json({
                success: true,
                message: "Product careted sucessfully",
                data: product
            })
            return Uplodfolder


        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Intenal server error." + error.message
            })
        }

    } else {
        console.log("old");
        const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });
        console.log(product);

        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Update sucessfully",
            data: product
        })



    }


}

const getproducttawith = async (req, res) => {
    try {
        const product = await Products.find({ subcategori_id: req.params.subcategori_id })

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'product not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'product found susscss',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

// const searchName = async (req, res) => {

//     //Retrieve the product using sortOrder, rating, max, min, category, page = 1, limit = 10)
//     try {
//         console.log(req.body);
//         const { sortOrder, rating, max, min, category, page, limit } = req.body

//         const matchPip = {}

//         if (rating) {
//             matchPip['avgRating'] = { $gte: rating }
//         }
//         if (category) {
//             matchPip['category_id'] = category
//         }

//         matchPip['variant.attributes.Price'] = {}

//         if (min != undefined) {
//             matchPip['variant.attributes.Price'].$gte = min
//         }

//         if (max != undefined) {
//             matchPip['variant.attributes.Price'].$lte = max
//         }

//         console.log(matchPip);



//         const pipline = [
//             {
//                 $lookup: {
//                     from: 'variants',
//                     localField: '_id',
//                     foreignField: 'product_id',
//                     as: 'variant'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'reviews',
//                     localField: '_id',
//                     foreignField: 'product_id',
//                     as: 'review'
//                 }
//             },
//             {
//                 $addFields: {
//                     avgrating: '$review.rating'
//                 }
//             },
//             {
//                 $unwind: {
//                     path: '$variant',

//                 }
//             },
//             {
//                 $match: matchPip

//                 // {
//                 //     avgrating: { $gte: 4 },
//                 //     category_id: 1,
//                 //     'variant.attributes.Price': { $gte: 0, $lte: 10000 }
//                 // }
//             },
//             {
//                 $group: {
//                     _id: '$_id',
//                     name: { $first: '$name' },
//                     variant: { $push: "$variant" },
//                     review: { $push: "$review" }
//                 }
//             },
//             {
//                 $sort: {
//                     name: sortOrder==="avbc" ? 1 : -1
//                 }
//             },
//             {
//                 $skip: 0
//             },
//             {
//                 $limit: 10
//             }
//         ]


//         // if (page > 0 && limit > 0) {
//         //     pipline.push({ $skip: (page - 1) * limit })
//         //     pipline.push({ $limit:  limit })
//         // }

//         const data = await Products.aggregate(pipline)
//         console.log(data);

//         // res.status(400).json({
//         //     success: true,
//         //     message: "Product data fected",
//         //     data: data
//         // })

//     } catch (error) {

//     }

// }
const searchName = async (req, res) => {
    try {
        console.log(req.body);
        const { sortOrder, rating, max, min, category, page, limit} = req.body;

        const matchPip = {};

        if (rating) {
            matchPip['avgRating'] = { "$gte": rating };
        }
        if (category) {
            matchPip['category_id'] = category;
        }

        // if (min != undefined || max != undefined) {
            matchPip['variant.attributes.Price'] = {};
            if (min != undefined) {
                matchPip['variant.attributes.Price'].$gte = min;
            }
            if (max != undefined) {
                matchPip['variant.attributes.Price'].$lte = max;
            }
        // }

        console.log(matchPip);

        const pipeline = [
            {
                $lookup: {
                    from: 'variants',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'variant'
                }
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'review'
                }
            },
            {
                $addFields: {
                    avgRating: { $avg: '$review.rating' }
                }
            },
            {
                $unwind: {
                    path: '$variant'
                }
            },
            {
                $match: matchPip
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    variant: { $push: "$variant" },
                    review: { $push: "$review" },
                    avgRating: { $first: "$avgRating" }
                }
            },
            {
                $sort: {
                    name: sortOrder === "asc" ? 1 : -1
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ];

        const data = await Products.aggregate(pipeline);
        console.log(data);

        res.status(200).json({
            success: true,
            message: "Product data fetched",
            data: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products",
            error: error.message
        });
    }
};

const productsByCategory = async (req, res) => {

    const products = await Products.aggregate([

        {
            $lookup: {
                from: "categories",
                localField: "categori_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: {
                path: "$category"
            }
        },
        {
            $project: {
                "name": 1,
                "image.url": 1,
                "category": 1
            }
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const productsBySubcategory = async (req, res) => {

    const products = await Products.aggregate([
        {
            $lookup: {
                from: "subcategories",
                localField: "subcategori_id",
                foreignField: "_id",
                as: "subcategory"
            }
        },
        {
            $unwind: {
                path: "$subcategory"
            }
        },
        {
            $project: {
                "name": 1,
                "image.url": 1,
                "subcategory": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const topRate = async (req, res) => {

    const products = await Products.aggregate([

        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "product_id",
                as: "review"
            }
        },
        {
            $unwind: {
                path: "$review"
            }
        },
        {
            $group: {
                _id: "$_id",
                "product_name": { $first: "$name" },
                "Totalrating": {
                    $sum: "$review.rating"
                }
            }
        },
        {
            $sort: {
                "Totalrating": -1
            }
        },
        {
            $limit: 1
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const newArrivals = async (req, res) => {

    const products = await Products.aggregate([
        {
            $sort: {
                "createdAt": -1
            }
        },
        {
            $limit: 3
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const countCategories = async (req, res) => {

    const products = await Products.aggregate([

        {
            $lookup: {
                from: "categories",
                localField: "categori_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: {
                path: "$category"
            }
        },
        {
            $group: {
                _id: "$category._id",
                "category_name": { $first: "$category.name" },
                "product_name": { $push: "$name" },
                "TotalProduct": {
                    $sum: 1
                }
            }
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const discount = async (req, res) => {
        try {
            
    
            const product = await Products.aggregate(
                [
                    {
                      $match: {
                        price: { $lt: 100 }
                      }
                    },
                    {
                      $sort: {
                        createdAt: -1
                      }
                    }
                  ]
            );
            
    
    
            res.status(200).json({
                success: true,
                message: "Product fetched sucessfully",
                data: product
            })
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Intenal server error." + error.message
            })
        }
    }


module.exports = {
    listproducts,
    getproducts,
    addproducts,
    deleteproducts,
    updateproducts,
    getproducttawith,
    searchName,
    productsByCategory,
    productsBySubcategory,
    topRate,
    newArrivals,
    countCategories,
    discount

}