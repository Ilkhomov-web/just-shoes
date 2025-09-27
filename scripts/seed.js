const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://ilhomovelyor119_db_user:oFlLYezZUf8Eks1G@justshoes.xlbh9dy.mongodb.net/?retryWrites=true&w=majority&appName=JustShoes';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
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

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Product Schema
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

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Create admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      phone: 'laziz2211',
      password: '3112211',
      address: 'Admin Address',
      gender: 'male',
      role: 'admin'
    });
    await adminUser.save();

    // Create categories
    const categories = [
      {
        name: 'Shoes',
        description: 'All types of footwear',
        image: '/vercel.svg'
      },
      {
        name: 'T-shirts',
        description: 'Comfortable cotton t-shirts',
        image: '/vercel.svg'
      },
      {
        name: 'Pants',
        description: 'Casual and formal pants',
        image: '/vercel.svg'
      },
      {
        name: 'Hats',
        description: 'Stylish headwear',
        image: '/vercel.svg'
      },
      {
        name: 'Jackets',
        description: 'Warm and stylish jackets',
        image: '/vercel.svg'
      }
    ];

    for (const category of categories) {
      const newCategory = new Category(category);
      await newCategory.save();
    }

    // Create products
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
      },
      {
        name: 'Puma Deviate Nitro',
        price: 139.99,
        discountPercent: 0,
        description: 'High-performance running shoes',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['black', 'orange', 'gray'],
        category: 'Shoes',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      },
      {
        name: 'New Balance 990v5',
        price: 199.99,
        discountPercent: 10,
        description: 'Classic lifestyle sneakers',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['gray', 'navy', 'white'],
        category: 'Shoes',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      },
      {
        name: 'Converse Chuck Taylor',
        price: 69.99,
        discountPercent: 25,
        description: 'Classic canvas sneakers',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['black', 'white', 'red'],
        category: 'Shoes',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      },
      {
        name: 'Basic Cotton T-shirt',
        price: 19.99,
        discountPercent: 0,
        description: 'Comfortable everyday t-shirt',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['white', 'black', 'blue', 'red'],
        category: 'T-shirts',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      },
      {
        name: 'Classic Jeans',
        price: 49.99,
        discountPercent: 15,
        description: 'Comfortable denim pants',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['blue', 'black', 'gray'],
        category: 'Pants',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      },
      {
        name: 'Baseball Cap',
        price: 24.99,
        discountPercent: 0,
        description: 'Classic baseball cap',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['black', 'white', 'red', 'blue'],
        category: 'Hats',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      },
      {
        name: 'Winter Jacket',
        price: 89.99,
        discountPercent: 30,
        description: 'Warm winter jacket',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['black', 'navy', 'gray'],
        category: 'Jackets',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      },
      {
        name: 'Summer T-shirt',
        price: 29.99,
        discountPercent: 20,
        description: 'Lightweight summer t-shirt',
        sizes: [38, 39, 40, 41, 42, 43, 44],
        colors: ['white', 'yellow', 'orange', 'green'],
        category: 'T-shirts',
        img: '/vercel.svg',
        stockStatus: 'in_stock'
      }
    ];

    for (const product of products) {
      const newProduct = new Product(product);
      await newProduct.save();
    }

    console.log('Database seeded successfully!');
    console.log('Admin user created: laziz2211 / 3112211');
    console.log('Categories and products created');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
