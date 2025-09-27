import dbConnect from '../../../lib/mongodb';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });
      res.status(200).json(categories);
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
