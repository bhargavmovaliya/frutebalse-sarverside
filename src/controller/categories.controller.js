// const { Uplodfolderimg } = require("../../../../frontend/fruitables/src/utils/cloudinary");
const Categories = require("../models/categories.models");

const listcategories = async (req, res) => {
    console.log("jdhgfndjhdjdjdjjjuh",req.query.page,req.query.pageSize);
    
    try {
        const page = parseInt(req.query.page);
        const pageSize=parseFloat(req.query.pageSize);

        if(page<=0||pageSize<=0){
            res.status(404).json({
                success: false,
                message: "page or pagesi`ze gretar"
            })
        }

        
        const categories = await Categories.find();

        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                message: "categories not found"
            })
        }

        let satrtindex=0,endindex=0,paginasion=0;

        if(page<=0||pageSize>0){
            satrtindex=(page-1)*pageSize;
            endindex=satrtindex+pageSize;
            paginasion=categories.slice(satrtindex,endindex)

        }

        res.status(200).json({
            success: true,
            message: "categories fatech succesfully",
            data: paginasion
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}
const getcategories = async () => {

}
const addcategories = async (req, res) => {
   console.log("vgvgfgfgf",req.body);
   
    
    // try {

    //     // console.log(req.file);
    //     // console.log(req.body);
    //     // const fileRes=await Uplodfolderimg(req.file.path,"cateegory");
    //     // console.log(fileRes);
    //     const category = await Categories.create({
    //         ...req.body,
    //         // category_img:{
    //         //     public_id:fileRes.public_id,
    //         //     url:fileRes.url
    //         // }
    //     })
    //     console.log(category);

    //     if (!category) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Category not Created"
    //         })
    //     }

    //     res.status(201).json({
    //         success: true,
    //         message: "Category Created succesfully",
    //         data: category
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "internal server error" + error.message
    //     })
    // }
}
const deletecategories = async (req, res) => {
    try {
        // console.log(req.params.category_id);

        const category = await Categories.findByIdAndDelete(req.params.category_id)

        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Delete succesfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}
const updatecategories = async (req, res) => {
    console.log("dhuwhfhf", req.params.category_id, req.body);
    try {
        const category = await Categories.findByIdAndUpdate(req.params.category_id, req.body, { new: true, runValidators: true })

        if (!category) {
            res.status(400).json({
                success: false,
                message: "category not update"
            })
        }

        res.status(200).json({
            success: true,
            message: "category Updated  succesfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error" + error.message
        })
    }
}

const countallnuer = async (req, res) => {

    try {
        const category = await Categories.aggregate([
            
                {
                    $match: {
                        isActive: true
                    }
                },
                {
                    $count: 'count'
                }
            

        ]);
    
        res.status(200).json({
            success: true,
            data: category,
        });





    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }


}

const mostprodact = async (req, res) => {

    try {
        const categories = await Categories.aggregate(
            [
             {
               "$match": {
                 "isActive": true
               }
             },
             {
               "$lookup": {
                 "from": "products",
                 "localField": "_id",
                 "foreignField": "category_id",
                 "as": "products"
               }
             },
             {
               "$project": {
                 "categoryName": "$name",
                 "productCount": { "$size": "$products" }
               }
             },
             {
               "$sort": {
                 "productCount": -1
               }
             },
             {
               "$limit": 3
             }
            ]

    );
      
        res.status(200).json({
            success: true,
            data: categories,
        });





    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message,
        })
    }


}
const totalproduct = async (req, res) => {

    try {
        const category = await Categories.aggregate(
           
           [
    
 {
     "$lookup": {
       "from": "products",
       "localField": "_id",
       "foreignField": "category_id",
       "as": "products"
     }
   },
   {
     "$project": {
       "categoryName": "$name",
       "productCount": { "$size": "$products" },
       "productName": "$products"
     }
   }
 ]

        );
    
        res.status(200).json({
            success: true,
            data: category,
        });





    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }


}

const inActive = async (req, res) => {

    try {
        const category = await Categories.aggregate(
            [
                {
                  $match: {isActive:false}
                }
              ]
            

        );
    
        res.status(200).json({
            success: true,
            data: category,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }


}

const countsubcategories  = async (req, res) => {

    try {
        const category = await Categories.aggregate(
            [
                     {
                       $lookup: {
                         from: "subcategories",
                         localField: "_id",
                         foreignField: "category_id",
                         as: "Subacategory"
                       }
                     },
                     {
                       $match: {
                         Subacategory: { $ne: [] }
                       }
                     },
                     {
                       $unwind: "$Subacategory"
                     },
                  
                     {
                       $group: {
                         _id: "$_id",
                         category_name: { $first: "$category_name" },
                         countsubcategories: {
                           $sum: 1
                         },
                  
                         subcategories_name: {
                           $push: "$Subacategory.subcategory_name"
                         }
                       }
                     }
                   ]

        );
    
        res.status(200).json({
            success: true,
            data: category,
        });





    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }


}

module.exports = {
    listcategories,
    getcategories,
    addcategories,
    deletecategories,
    updatecategories,
    countallnuer,
    mostprodact,
    totalproduct,
    inActive,
    countsubcategories
}



// /category/count-category
// [
//     {
//       $match: {
//         isActive:true
//       }
//     },
//     {
//       $count: 'Noofcategories'
//     }
//   ]




///category/most-products         //Retrieve categories with the highest number of products.
// [
//     {
//       "$match": {
//         "isActive": true
//       }
//     },
//     {
//       "$lookup": {
//         "from": "products",
//         "localField": "_id",
//         "foreignField": "category_id",
//         "as": "products"
//       }
//     },
//     {
//       "$project": {
//         "categoryName": "$name",
//         "productCount": { "$size": "$products" }
//       }
//     },
//     {
//       "$sort": {
//         "productCount": -1
//       }
//     },
//     {
//       "$limit": 3
//     }
//   ]


// /category/total-products      //Retrieve the total number of products per category with products?
// [
    
// {
//     "$lookup": {
//       "from": "products",
//       "localField": "_id",
//       "foreignField": "category_id",
//       "as": "products"
//     }
//   },
//   {
//     "$project": {
//       "categoryName": "$name",
//       "productCount": { "$size": "$products" },
//       "productName": "$products"
//     }
//   }
// ]


// /category/inactive              //Retrieve a list of inactive categories.
// [
//   {
//     "$match": { "active": false }
//   }
// ]



// /category/count-subcategories   //Retrieve the count of subcategories for each category.

// [
//     {
//       $lookup: {
//         from: "subcategories",
//         localField: "_id",
//         foreignField: "category_id",
//         as: "Subacategory"
//       }
//     },
//     {
//       $match: {
//         Subacategory: { $ne: [] }
//       }
//     },
//     {
//       $unwind: "$Subacategory"
//     },
  
//     {
//       $group: {
//         _id: "$_id",
//         category_name: { $first: "$category_name" },
//         countsubcategories: {
//           $sum: 1
//         },
  
//         subcategories_name: {
//           $push: "$Subacategory.subcategory_name"
//         }
//       }
//     }
//   ]