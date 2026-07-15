import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  hospitalName: { type: String },
  email: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: 'New' } // To help you track unread messages later
}, { timestamps: true });

// This prevents Next.js from crashing by trying to create the model twice
export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);