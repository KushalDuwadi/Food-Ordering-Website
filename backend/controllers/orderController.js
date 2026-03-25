import orderModel from "../models/orderModel.js";

import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



//placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { items, amount, address, userId } = req.body;

    const newOrder = new orderModel({
      userId: new mongoose.Types.ObjectId(userId),
      items,
      amount,
      address,
      status: "Food Processing",
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

  const line_items = items.map(item => ({
  price_data: {
    currency: 'usd',
    product_data: {
      name: item.name,
      description: item.description,
    },
    unit_amount: item.price * 100,
  },
  quantity: item.quantity, // ✅ Correct key
}));


    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Shipping Cost',
          description: 'Standard shipping',
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ success: false, message: "error in payment" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId ,success} = req.body;

  try {
    const order = await orderModel.findById(orderId);

    if (success == 'true') {
     await orderModel.findByIdAndUpdate(orderId, { payment: "True" });
     res.json({ success: true, message: "Paid" });
    }

    else {
      await orderModel.findByIdAndUpdate(orderId, { payment: "False" });
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Verify order error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export { placeOrder, verifyOrder };