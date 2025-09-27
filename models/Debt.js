import mongoose from 'mongoose';

const debtSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone1: { type: String, required: true },
  phone2: { type: String, default: '' },
  amount: { type: Number, required: true },
  currency: { type: String, enum: ['UZS', 'USD'], default: 'UZS' },
  status: { 
    type: String, 
    enum: ['active', 'paid', 'overdue'], 
    default: 'active' 
  },
  notes: { type: String, default: '' },
  customerImage: { type: String, default: '' },
  passportImage: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Debt || mongoose.model('Debt', debtSchema);
