import userModel from "../models/userModel.js";

// Add to Cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user.id); // <-- changed here
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.user.id, { cartData }); // <-- changed here
    return res.status(200).json({ message: "Item added to cart successfully", cartData });

  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user.id); // <-- changed here
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;

      if (cartData[req.body.itemId] <= 0) {
        delete cartData[req.body.itemId];
      }

      await userModel.findByIdAndUpdate(req.user.id, { cartData }); // <-- changed here
      return res.status(200).json({ message: "Item removed from cart successfully", cartData });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user.id); // <-- changed here
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    return res.status(200).json({ message: "Cart fetched successfully", cartData });

  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, removeFromCart, getCart };







// import userModel from "../models/userModel.js";




// // Function to add food to the cart
// const addToCart = async (req, res) => {
//     try{
//         let userData = await userModel.findId(req.body.userId);
//         let cartData = await userData.cartData;
//         if(!cartData[req.body.itemId]){ 
//             cartData[req.body.itemId] = 1;
//         } else {
//             cartData[req.body.itemId] += 1;
//             }
//             await userModel.findByIdAndUpdate(req.body.userId, {cartData: cartData});
//             return res.status(200).json({ message: "Item added to cart successfully", cartData: cartData });
            
//     }


// catch (error) {
//         console.error(error);
//         return res.status(500).json({success:false, message: "Server error" });
//     }
// }


// // Function to remove food to the cart

// const removeFromCart = async (req, res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = userData.cartData;
        
//         if (cartData[req.body.itemId]>0) {
//              cartData[req.body.itemId]-=1;
//             await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });
//             return res.status(200).json({ message: "Item removed from cart successfully", cartData: cartData });
//         } else {
//             return res.status(404).json({ message: "Item not found in cart" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Server error" });
//     }

// }

// //fetch user cart data
// const getCart = async (req, res) =>{
//     try {
//         let userData = await userModel.findById(req.body.userId);        
//         let cartData = userData.cartData;
//         if (!cartData) {
//             return res.status(404).json({ message: "Cart is empty" });
//         }
//         return res.status(200).json({ message: "Cart fetched successfully", cartData: cartData });
//         } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Server error" });
//         }
// }

// export{addToCart, removeFromCart, getCart};