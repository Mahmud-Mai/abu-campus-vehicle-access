import mongoose, { Schema, model } from "mongoose";

const VehicleSchema = new Schema({
  plateNumber: {
    type: String,
    unique: true,
    required: true,
  },
  blacklistStatus: { type: Schema.Types.ObjectId, ref: "Blacklist" },
});

const Vehicle = new model("Vehicle", VehicleSchema);
export default Vehicle;
