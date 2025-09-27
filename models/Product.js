import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  description: { type: String, required: true },
  sizes: [{ type: Number }],
  colors: [{ type: String }],
  category: { type: String, required: true },
  img: { type: String, required: true },
  stockStatus: { 
    type: String, 
    enum: ['in_stock', 'out_of_stock', 'coming_soon'], 
    default: 'in_stock' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
