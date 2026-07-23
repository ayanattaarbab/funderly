import mongoose from 'mongoose';

const CreatorSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  country: { type: String, required: true },
  language: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  avatarPublicId: { type: String, default: '' },
  coverUrl: { type: String, default: '' },
  coverPublicId: { type: String, default: '' },
  safepayPublicKey: { type: String, required: true },
  safepaySecretKey: { type: String, required: true },
  links: {
    instagram: String, youtube: String, tiktok: String, x: String
  },
  customLinks: [{ label: String, url: String }],
  fans: [{
    name: { type: String, default: null },
    message: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    anonymous: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'success', 'cancelled'], default: 'pending' },
    paidAt: { type: Date, default: null },
    orderId: { type: String, default: null }
  }]
}, { timestamps: true });

export default mongoose.models.Creator || mongoose.model('Creator', CreatorSchema);