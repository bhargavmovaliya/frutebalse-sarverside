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

const prodactlistcategory = async (req, res) => {
    try {

        const product = await Products.aggregate(
            [
                {
                    $match: {
                        category_id: ObjectId(category_id)
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'subcategory_id',
                        as: 'Product'
                    }
                },
                {
                    $addFields: {
                        countProduct: { $size: '$Product' }
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        countProduct: { $first: '$countProduct' }
                    }
                }
            ]

        );
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const toprated = async (req, res) => {
    try {
        const product = await Products.aggregate(
            [
                {
                    $sort: {
                        rating: -1
                    }
                },
                {
                    $limit: 10
                }
            ]


        );
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
            
        });
    }
};
const arrivals  = async (req, res) => {
    try {
        const product = await Products.aggregate(
          
            [
                {
                  $sort: { createdAt: -1 }
                }
              ]

        );
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
            
        });
    }
};

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
const count = async (req, res) => {
    try {
        

        const product = await Products.aggregate(
            [
                {
                  $group: {
                    _id: "$category_id",
                    count: { $sum: 1 }
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

const searchName = async (req, res) => {

    const products = await Products.aggregate([
        {
            $match: {
         //     "name" : /^[a-zA-Z0-9!@#$&()`.+,/"-]*$/
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
const productsByCategory = async (req, res) => {

    const products = await Products.aggregate([

        {
            $lookup: {
                from: "categories",
                localField: "category_id",
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
                "product_img.url": 1,
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
                localField: "subcategory_id",
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
                "product_img.url": 1,
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
const searchprodact =  async (req, res) =>  {
    try {
        // console.log(req.body);

        const { sortOrder, rating, max, min, category, page, limit } = req.body  //query

        const matchPip = {}

        if (rating) {
            matchPip['avgrating'] = { $gte: parseInt(rating) }
        }

        if (category) {
            matchPip["category_id"] = parseInt(category)
        }

        matchPip['variant.attributes.Price'] = {}

        if (min != undefined) {
            matchPip['variant.attributes.Price'].$gte = parseInt(min)
        }

        if (max != undefined) {
            matchPip['variant.attributes.Price'].$lte = parseInt(max)
        }

        console.log(matchPip);


        const pipline = [
            {
              $lookup: {
                from: "variants",
                localField: "_id",
                foreignField: "product_id",
                as: "variant"
              }
            },
            {
              $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "product_id",
                as: "review"
              }
            },
            {
              $addFields: {
                avgrating: "$review.rating"
              }
            },
            {
              $unwind: {
                path: "$variant"
              }
            },
            {
              $match: {
                avgrating: { $gte: 4 },
                category_id: 1,
                "variant.attributes.Price": {
                  $gte: 0,
                  $lte: 10000
                }
              }
            },
            {
              $group: {
                _id: "$_id",
                name: { $first: "$name" },
                variant: { $push: "$variant" },
                review: { $push: "$review" }
              }
            },
            {
              $sort: {
                name: sortOrder === 'asc' ? 1 : -1              }
            }
            
          ]


        if (parseInt(page) > 0 && parseInt(limit) > 0) {
            pipline.push({ $skip: (parseInt(page) - 1) * parseInt(limit) })
            pipline.push({ $limit: parseInt(limit) })
        }

        const data = await Products.aggregate(pipline);
        console.log(data);

        res.status(200).json({
            success: true,
            data: data,
            message: "Product data Fetched",
        })



    } catch (error) {
        console.log(error);
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
    prodactlistcategory,
    toprated,
    arrivals,
    discount,
    count,
    searchName,
    productsByCategory,
    productsBySubcategory,
    searchprodact

}