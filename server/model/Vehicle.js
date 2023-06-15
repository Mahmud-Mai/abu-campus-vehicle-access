import mongoose, { Schema, model } from "mongoose";

const VehicleSchema = new Schema({
  plateNumber: {
    type: String,
    unique: true,
    required: true,
  },
});

const Vehicle = new model("Vehicle", VehicleSchema);
export default Vehicle;
