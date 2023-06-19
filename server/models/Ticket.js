import mongoose, { Schema, model } from "mongoose";

const TicketSchema = new Schema(
  {
    plateNumber: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    gate: { type: Schema.Types.ObjectId, ref: "Gate", required: true },
    ticketStatus: {
      type: String,
      enum: ["Inbound", "Outbound"],
      default: "Inbound",
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    exitTime: { type: Date, default: null }, // Set initial value to null
  },
  { timestamps: true }
);

const Ticket = new model("Ticket", TicketSchema);
export default Ticket;
