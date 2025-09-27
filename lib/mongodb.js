import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ilhomovelyor119_db_user:oFlLYezZUf8Eks1G@justshoes.xlbh9dy.mongodb.net/?retryWrites=true&w=majority&appName=JustShoes';

if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default mongoose;
