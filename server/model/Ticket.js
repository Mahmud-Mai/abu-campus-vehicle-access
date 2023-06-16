import mongoose, { Schema } from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    plateNumber: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    gate: { type: Schema.Types.ObjectId, ref: "Gate" },
  },
  { timestamps: true }
);

const Ticket = new mongoose.model("Ticket", TicketSchema);
export default Ticket;
