import dbConnect from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  userImage: { type: String, default: '' },
  address: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

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
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    await dbConnect();

    // old data clear
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    // create admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      phone: '903112211',
      password: '3112211',
      address: 'Admin Address',
      gender: 'male',
      role: 'admin'
    });
    await adminUser.save();

    // categories
    const categories = [
      { name: 'Shoes', description: 'All types of footwear', image: '/vercel.svg' },
      { name: 'T-shirts', description: 'Comfortable cotton t-shirts', image: '/vercel.svg' },
      { name: 'Pants', description: 'Casual and formal pants', image: '/vercel.svg' },
      { name: 'Hats', description: 'Stylish headwear', image: '/vercel.svg' },
      { name: 'Jackets', description: 'Warm and stylish jackets', image: '/vercel.svg' }
    ];
    await Category.insertMany(categories);

    // products (xuddi sening productlaringni shu yerga qo‘shamiz)
    const products = [
      {
        name: 'Nike Air Zoom Pegasus',
        price: 129.99,
        discountPercent: 15,
        description: 'Comfortable running shoes with excellent cushioning',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['black', 'white', 'blue'],
        category: 'Shoes',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      },
      {
        name: 'Adidas Ultraboost 22',
        price: 179.99,
        discountPercent: 20,
        description: 'Premium running shoes with Boost technology',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['white', 'black', 'red'],
        category: 'Shoes',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      }
      // qolgan productlarni ham shu yerga qo‘shasan...
    ];
    await Product.insertMany(products);

    return res.status(200).json({ message: 'Database seeded successfully!' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Seeding failed', error: err.message });
  }
}
