import mongoose, { Schema, models } from "mongoose";

const highlightSchema = new Schema(
  {
    slug: { type: String, unique: true },
    images: [{ type: String }],
    title_en: { type: String, required: true },
    title_hu: { type: String, required: true },
    title_ar: { type: String, required: false },
    desc_en: { type: String, required: true },
    desc_hu: { type: String, required: true },
    desc_ar: { type: String, required: false },
    status: { type: String, required: false, default: "active" },
    date: { type: Date, required: false },
  },
  { timestamps: true }
);

// Indexes
// `slug` already gets a unique index from the field definition above —
// declaring it again made Mongoose build a duplicate on every cold start.
highlightSchema.index({ createdAt: -1 });
highlightSchema.index({ date: -1 });
highlightSchema.index({ status: 1, createdAt: -1 });
highlightSchema.index({
  title_en: "text",
  title_hu: "text",
  title_ar: "text",
  desc_en: "text",
  desc_hu: "text",
  desc_ar: "text",
});

// Auto-generate slug
highlightSchema.pre("save", async function () {
  if (!this.isModified("title_en")) return;

  const baseSlug = this.title_en
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  let slug = baseSlug;
  let counter = 1;

  while (await mongoose.models.Highlight.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

const Highlight =
  models.Highlight || mongoose.model("Highlight", highlightSchema);
export default Highlight;
