const Carts = require("../models/carts.models");

const getCart = async (req, res) => {
  try {
      const carts = await Carts.findById(req.params.cart_id)

      if (!carts) {
          res.status(404).json({
              success: false,
              meassage: 'carts not found.'
          })
      }

      res.status(200).json({
          success: true,
          message: 'carts fetch successfully.',
          data: carts
      })
  } catch (error) {
      res.status(500).json({
          success: false,
          meassage: 'Internal Server Error.' + error.meassage
      })
  }
}

// const addCarts = async(req,res) => {
//     try {
//         const carts = await Carts.create(req.body)
//         if(!carts){
//             res.status(400).json({
//                 success: false,
//                 message: 'carts not created.'
//             })
//         }
//         res.status(201).json({
//             success: true,
//             message: 'carts created successfully.',
//             data: carts
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             meassage: 'Internal Server Error.' + error.meassage
//         })
//     }
// }

const addCarts = async (req, res) => {
  try {
          console.log('Request body:', req.body);
          const { user_id, isActive = true, items } = req.body;
          console.log("dfddfffgdg");

      let cart = await Carts.findOne({ user_id });

      if (!cart) {
          cart = new Carts({ user_id, isActive, items });
      } else {
          items.forEach(item => {
              const itemIndex = cart.items.findIndex(v => v.product_id.toString() === item.product_id);
              if (itemIndex !== -1) {
                  cart.items[itemIndex].quantity += item.quantity;
              } else {
                  cart.items.push({ product_id: item.product_id, quantity: item.quantity });
              }
          });
      }
      await cart.save();

      res.status(201).json({
          success: true,
          message: 'Cart add successfully.',
          data: cart
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Internal server error: ' + error.message
      });
  }
};



const updatecart = async (req, res) => {
  try {
    const cart = await Carts.findByIdAndUpdate(req.params.cart_id, req.body,{ new: true, runValidators: true });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal error: ' + error.message,
    });
    }
  };
// const deleteCartItem = async (req, res) => {
//     try {
//         // const cart = await Carts.findByIdAndDelete(req.params.cart_id);
//         // console.log(cart);

//         const { cart_id, product_id } = req.params;

//         const cart = await Carts.findById(cart_id);
//         if(!cart){
//             return res.status(404).json({
//                 success: false,
//                 message: 'carts not found',
//             })
//         }

//         const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
//         if(itemIndex === -1){
//             return res.status(404).json({
//                 success: false,
//                 message: 'products not found',
//             })
//         }

//         cart.items.splice(itemIndex,1);
//         await cart.save();

//         res.status(200).json({
//             success: true,
//             message: 'product delete from cart successfully',
//             data: cart
//         })
//     } catch (error) {

//     }
// }

const deleteCartItem = async (req, res) => {
  try {
      const { cart_id, product_id } = req.params;

      const cart = await Carts.findById(cart_id);
      if (!cart) {
          return res.status(404).json({
              success: false,
              message: 'Cart not found'
          });
      }

    
      const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
      if (itemIndex === -1) {
          return res.status(404).json({
              success: false,
              message: 'Product not found in cart'
          });
      }

    
      cart.items.splice(itemIndex, 1);
      await cart.save();

      res.status(200).json({
          success: true,
          message: 'Product removed from cart successfully',
          data: cart
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Internal server error: ' + error.message
      });
  }
};

module.exports = {
  getCart,
  addCarts,
  updatecart,

  deleteCartItem
}
