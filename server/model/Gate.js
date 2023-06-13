import mongoose from "mongoose";

const GateSchema = new mongoose.Schema(
  {
    gateId: Number,
    gateName: {
      type: String,
      required: true,
      min: 4,
    },
  },
  { timestamps: true }
);

const Gate = new mongoose.model("Gate", GateSchema);
export default Gate;
