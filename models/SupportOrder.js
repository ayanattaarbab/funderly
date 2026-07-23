import mongoose from 'mongoose';

const SupportOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true, index: true },
  amount: { type: Number, required: false },
  currency: { type: String, required: false },
  status: { type: String, enum: ['pending', 'success', 'cancelled'], default: 'pending' },
  supporterName: { type: String, default: null },
  supporterMessage: { type: String, default: null },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null }
});

export default mongoose.models.SupportOrder || mongoose.model('SupportOrder', SupportOrderSchema);