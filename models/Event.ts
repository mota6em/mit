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
    date: { type: String, required: false },
    time: { type: String, required: false },
    isRecurring: { type: Boolean, default: false },
    recurringDays: { type: [String], required: false },
    registrationUrl: { type: String, required: false },
  },
  { timestamps: true }
);

// Middleware to generate unique slug before saving
eventSchema.pre("save", async function () {
  if (!this.isModified("title_en")) return;

  // Create base slug:
  const baseSlug = this.title_en
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  let slug = baseSlug;
  let counter = 1;

  // Check for uniqueness
  while (await mongoose.models.Event.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

const Event = models.Event || mongoose.model("Event", eventSchema);
export default Event;
