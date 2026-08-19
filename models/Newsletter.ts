import mongoose, { Schema, models } from "mongoose";

const newsletterSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Newsletter =
  models.Newsletter || mongoose.model("Newsletter", newsletterSchema);
export default Newsletter;
