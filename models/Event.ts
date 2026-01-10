import mongoose, { Schema, models } from "mongoose";

const eventSchema = new Schema(
  {
    slug: { type: String, unique: true },
    img: { type: String, required: false },
    title_en: { type: String, required: true },
    title_hu: { type: String, required: true },
    desc_en: { type: String, required: true },
    desc_hu: { type: String, required: true },
    note_en: { type: String, required: false },
    note_hu: { type: String, required: false },
    location: { type: String, required: false },
    date: { type: Date, required: false },
    time: { type: String, required: false },
    isRecurring: { type: Boolean, default: false },
    recurringDays: { type: [String], required: false },
    registrationUrl: { type: String, required: false },
  },
  { timestamps: true }
);

// Indexes
eventSchema.index({ slug: 1 });
eventSchema.index({ date: -1 });
eventSchema.index({ isRecurring: 1, date: -1 });
eventSchema.index({ createdAt: -1 });
eventSchema.index({
  title_en: "text",
  title_hu: "text",
  desc_en: "text",
  desc_hu: "text",
  location: "text",
});

// Auto-generate slug
eventSchema.pre("save", async function () {
  if (!this.isModified("title_en")) return;

  const baseSlug = this.title_en
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  let slug = baseSlug;
  let counter = 1;

  while (await mongoose.models.Event.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

const Event = models.Event || mongoose.model("Event", eventSchema);
export default Event;
