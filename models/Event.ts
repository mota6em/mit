import mongoose, { Schema, models } from "mongoose";

const eventSchema = new Schema(
  {
    img: { type: String, required: false },
    title_en: { type: String, required: true },
    title_hu: { type: String, required: true },
    desc_en: { type: String, required: true },
    desc_hu: { type: String, required: true },
    note_en: { type: String, required: false },
    note_hu: { type: String, required: false },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = models.Event || mongoose.model("Event", eventSchema);

export default Event;
