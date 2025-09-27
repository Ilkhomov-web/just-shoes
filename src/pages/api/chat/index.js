import dbConnect from '../../../../lib/mongodb';
import Chat from '../../../../models/Chat';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { userId, adminId } = req.query;
      let query = {};
      
      if (userId && adminId) {
        query = {
          $or: [
            { senderId: userId, receiverId: adminId },
            { senderId: adminId, receiverId: userId }
          ]
        };
      }

      const messages = await Chat.find(query)
        .populate('senderId', 'firstName lastName userImage role')
        .populate('receiverId', 'firstName lastName userImage role')
        .sort({ createdAt: 1 });
      
      res.status(200).json(messages);
    } catch (error) {
      console.error('Get chat error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const chat = new Chat(req.body);
      await chat.save();
      
      const populatedChat = await Chat.findById(chat._id)
        .populate('senderId', 'firstName lastName userImage role')
        .populate('receiverId', 'firstName lastName userImage role');
      
      res.status(201).json(populatedChat);
    } catch (error) {
      console.error('Create chat error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
