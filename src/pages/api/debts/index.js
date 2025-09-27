import dbConnect from '../../../lib/mongodb';
import Debt from '../../../models/Debt';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const debts = await Debt.find().sort({ createdAt: -1 });
      res.status(200).json(debts);
    } catch (error) {
      console.error('Get debts error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const debt = new Debt(req.body);
      await debt.save();
      res.status(201).json(debt);
    } catch (error) {
      console.error('Create debt error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
