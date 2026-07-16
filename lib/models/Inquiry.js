import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    hospitalName: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
    },

    product: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },

    details: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    source: {
      type: String,
      default: "website-contact-form",
    },

    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "in-progress",
        "closed",
      ],
      default: "new",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
 * Useful indexes
 */

inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ email: 1 });
inquirySchema.index({ status: 1 });
inquirySchema.index({ product: 1 });

export default mongoose.models.Inquiry ||
  mongoose.model("Inquiry", inquirySchema);