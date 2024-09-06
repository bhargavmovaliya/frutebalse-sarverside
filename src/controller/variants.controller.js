const Variants = require("../models/variants.model");

const listVariants = async (req, res) => {
    try {
        const variants = await Variants.find();
        if (!variants || variants.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Variant data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Variant data fetched",
            data: variants,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const getVariant = async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: "Data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Variant data fetched",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const addVariant = async (req, res) => {
    try {
        const variant = await Variants.create({
            ...req.body,
            variants_img: {
                public_id: fileRes.public_id,
                url: fileRes.url
            }
        });
        res.status(201).json({
            success: true,
            message: "Variant added successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const updateVariant = async (req, res) => {
    try {
        const updatedVariant = await Variants.findByIdAndUpdate(
            req.params.variant_id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedVariant) {
            return res.status(400).json({
                success: false,
                message: "Bad request",
            });
        }
        res.status(200).json({
            success: true,
            message: "Variant updated successfully",
            data: updatedVariant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: "Variant not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Variant deleted successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}
const Variantdetails = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $project: {
                _id: 1,
                categori_id: 1,
                subcategori_id: 1,
                product_id: 1,
                price: 1,
                stock: 1,
                discount: 1,
                attributes: 1,
                isActive: 1,
                createdAt: 1,
                updatedAt: 1,
                "productDetails._id": 1,
                "productDetails.name": 1,
                "productDetails.description": 1,
                "productDetails.price": 1,
                "productDetails.stock": 1,
                "productDetails.isActive": 1,
                "productDetails.createdAt": 1,
                "productDetails.updatedAt": 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

const variantparticularproduct = async (req, res) => {
    const variants = await Variants.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails"
        },
        // {
        //     $match: {
        //         "productDetails.name": "radishes" 
        //     }
        // },
        {
          $project: {
            _id: 1,
            categori_id: 1,
            subcategori_id: 1,
            product_id: 1,
            price: 1,
            stock: 1,
            discount: 1,
            attributes: 1,
            isActive: 1,
            createdAt: 1,
            updatedAt: 1,
            "productDetails._id": 1,
            "productDetails.name": 1,
            "productDetails.description": 1,
            "productDetails.price": 1,
            "productDetails.stock": 1,
            "productDetails.isActive": 1,
            "productDetails.createdAt": 1,
            "productDetails.updatedAt": 1
          }
        }
      ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

const countstock = async (req, res) => {
    const variants = await Variants.aggregate([
        {
          $group: {
            _id: "$product_id",
            totalStock: { $sum: "$stock" }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails"
        },
        {
          $project: {
            productId: "$_id",
            totalStock: 1,
            "productDetails.name": 1,
            "productDetails.description": 1
          }
        }
      ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}
const productslowstock = async (req, res) => {
    const variants = await Variants.aggregate([
        {
          $match: {
            stock: { $lt: 20 }
          }
        },
        {
          $group: {
            _id: "$product_id",
            totalStock: { $sum: "$stock" },
            variants: {
              $push: {
                variant_id: "$_id",
                stock: "$stock",
                price: "$price",
                discount: "$discount",
                attributes: "$attributes"
              }
            }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails"
        },
      
        {
          $project: {
            _id: 0,
            productId: "$_id",
            totalStock: 1,
            variants: 1,
            "productDetails.name": 1,
            "productDetails.description": 1
          }
        }
      ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

const productswithhighesprices = async (req, res) => {
    const variants = await Variants.aggregate([
        {
        $sort: {
          price: -1
        }
      },
      {
        $group: {
          _id: "$product_id",
          highestPrice: { $max: "$price" },
          variants: {
            $push: {
              variant_id: "$_id",
              price: "$price",
              stock: "$stock",
              discount: "$discount",
              attributes: "$attributes"
            }
          }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails"
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          highestPrice: 1,
          variants: 1,
          "productDetails.name": 1,
          "productDetails.description": 1
        }
      },
      {
        $sort: {
          highestPrice: -1
        }
      }
    ])

      res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

const morethanonevariant = async (req, res) => {
    const variants = await Variants.aggregate([
        {
          $group: {
            _id: "$product_id",
            variantCount: { $sum: 1 },
            variants: {
              $push: {
                variant_id: "$_id",
                price: "$price",
                stock: "$stock",
                discount: "$discount",
                attributes: "$attributes"
              }
            }
          }
        },
        {
          $match: {
            variantCount: { $gt: 1 }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails"
        },
        {
          $project: {
            _id: 0,
            productId: "$_id",
            variantCount: 1,
            variants: 1,
            "productDetails.name": 1,
            "productDetails.description": 1
          }
        }
      ])

     res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

const activevarint = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $match: {
                isActive: true
            }
        },
        {
            $project: {
                _id: 1,
                categori_id: 1,
                subcategori_id: 1,
                product_id: 1,
                price: 1,
                stock: 1,
                discount: 1,
                attributes: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const countptoduct = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $group: {
                _id: "$product_id", 
                countVariants: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0, 
                product_id: "$_id",
                countVariants: 1 
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

module.exports={
    listVariants,
    getVariant,
    addVariant,
    updateVariant,
    deleteVariant,
    Variantdetails,
    variantparticularproduct,
    countstock,
    productslowstock,
    productswithhighesprices,
    morethanonevariant,
    activevarint,
    countptoduct
}
