import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const orders = await Order.find()
        .populate('userId', 'firstName lastName phone')
        .populate('products.productId', 'name price img')
        .sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Get orders error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const order = new Order(req.body);
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
