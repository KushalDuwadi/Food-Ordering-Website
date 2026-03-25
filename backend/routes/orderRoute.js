import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder } from '../controllers/orderController.js';




const orderRouter = express.Router();
// Route to place an order
orderRouter.post('/place', authMiddleware, placeOrder);


orderRouter.post('/verify', (req, res) => {
  const { success, orderId } = req.query;
  if (success === 'true') {
    res.status(200).json({ message: 'Order placed successfully', orderId });
  } else {
    res.status(400).json({ message: 'Order placement failed', orderId });
  }
});


export default orderRouter;