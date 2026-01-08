import mongoose, { Schema, models } from "mongoose";

const highlightSchema = new Schema(
  {
    slug: { type: String, unique: true },
    images: [{ type: String }],
    title_en: { type: String, required: true },
    title_hu: { type: String, required: true },
    desc_en: { type: String, required: true },
    desc_hu: { type: String, required: true },
    status: { type: String, required: false, default: "active" },
    date: { type: Date, required: false },
  },
  { timestamps: true }
);

// Indexes for performance
highlightSchema.index({ date: 1 });
highlightSchema.index({ status: 1 });
highlightSchema.index({
  title_en: "text",
  title_hu: "text",
  desc_en: "text",
  desc_hu: "text",
});

// Middleware to generate unique slug before saving
highlightSchema.pre("save", async function () {
  if (!this.isModified("title_en")) return;

  // Create base slug:
  const baseSlug = this.title_en
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  let slug = baseSlug;
  let counter = 1;

  // Check for uniqueness
  while (await mongoose.models.Highlight.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

const Highlight =
  models.Highlight || mongoose.model("Highlight", highlightSchema);
export default Highlight;
