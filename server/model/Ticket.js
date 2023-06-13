import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    plateNumber: String,
    userId: String,
    gateId: String,
  },
  { timestamps: true }
);

const Ticket = new mongoose.model("Ticket", TicketSchema);
export default Ticket;
