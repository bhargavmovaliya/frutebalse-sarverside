module.exports.categorycreate  = require("./validation.category");


// [
//     {
//       $lookup: {
//         from: "variants",
//         localField: "_id",
//         foreignField: "product_id",
//         as: "variant"
//       }
//     },
//     {
//       $lookup: {
//         from: "reviews",
//         localField: "_id",
//         foreignField: "product_id",
//         as: "review"
//       }
//     },
//     {
//       $addFields: {
//         avgrating: "$review.rating"
//       }
//     },
//     {
//       $unwind: {
//         path: "$variant"
//       }
//     },
//     {
//       $match: {
//         avgrating: { $gte: 4 },
//         category_id: 1,
//         "variant.attributes.Price": {
//           $gte: 0,
//           $lte: 10000
//         }
//       }
//     },
//     {
//       $group: {
//         _id: "$_id",
//         name: { $first: "$name" },
//         variant: { $push: "$variant" },
//         review: { $push: "$review" }
//       }
//     },
//     {
//       $sort: {
//         name: 1
//       }
//     },
//     {
//       $skip: 0
//     },
//     {
//       $limit: 10
//     }
    
//   ]