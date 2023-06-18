import mongoose, { Schema, model } from "mongoose";

const blacklistSchema = new Schema({
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  reason: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Blacklist = model("Blacklist", blacklistSchema);
export default Blacklist;
