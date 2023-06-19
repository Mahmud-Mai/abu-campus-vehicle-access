import Ticket from "../models/Ticket.js";
import Vehicle from "../models/Vehicle.js";
import asyncHandler from "express-async-handler";
import Gate from "../models/Gate.js";
import User from "../models/User.js";

// @desc Get all ticket
// @route GET /ticket
// @access Private
export const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find();

  // Check tickets eist
  if (!tickets?.length)
    return res.status(400).json({ message: "Tickets list is empty" });

  // Populate user and gate fields
  const populatedTickets = await Promise.all(
    tickets.map(async (ticket) => {
      // Used separate .populate bcoz chained .populate() kept giving errors
      await ticket.populate({ path: "plateNumber", select: "plateNumber" });
      await ticket.populate({ path: "user", select: "userName" });
      await ticket.populate({ path: "gate", select: "gateName" });

      console.log("🚀 ~ getAllTickets ~ tickets:", {
        plateNumber,
        gate,
        user,
        ...ticket.toObject(),
      });

      const plateNumber = ticket.plateNumber
        ? ticket.plateNumber.plateNumber
        : null;
      const user = ticket.user ? ticket.user.userName : null;
      const gate = ticket.gate ? ticket.gate.gateName : null;
      return {
        ...ticket.toObject(),
        plateNumber,
        gate,
        user,
      };
    })
  );

  // Return response
  res.status(200).json(populatedTickets);
});

// @desc Create a ticket
// @route Post /tickets
// @access Private
export const createTicket = asyncHandler(async (req, res) => {
  const { plateNumber, gate, ticketStatus, user } = req.body;

  await Ticket.deleteMany({ ticketStatus: "Outbound" });

  // Validate user data
  if (!plateNumber || !gate || !ticketStatus || !user)
    return res.status(400).json({ message: "Please provide required fields" });

  // Check if vehicle exists
  const vehicleObject = await Vehicle.findOne({ plateNumber: plateNumber });
  console.log("🚀 createTicket ~ vehicleObject._id:", vehicleObject._id);

  if (!vehicleObject)
    return res
      .status(400)
      .json({ message: "The plateNumber provided is not in the Database" });

  // Convert plateNumber to ObjectId
  const plateNumberObjectId = mongoose.Types.ObjectId(vehicleObject._id);

  // Check if gate exists
  const gateObject = await Gate.findOne({ gateName: gate });
  console.log("🚀 createTicket ~ gateObject._id:", gateObject._id);
  if (!gateObject) {
    return res
      .status(400)
      .json({ message: "The gate provided is not in the Database" });
  }

  // Check if user exists
  const userObject = await User.findOne({ userName: user });
  console.log("🚀 createTicket ~ userObject._id:", userObject._id);
  if (!userObject) {
    return res
      .status(400)
      .json({ message: "The user provided is not in the Database" });
  }

  // Check vehicle has no open tickets
  const hasPrevTickets = await Ticket.find({ plateNumber });
  const prevTicketIsOpen = hasPrevTickets.some((prevTicket) => {
    return prevTicket.ticketStatus === "Outbound";
  });

  if (prevTicketIsOpen) {
    return res
      .status(400)
      .json({ message: "Vehicle already has an open ticket" });
  }

  // Create Ticket
  const ticket = await Ticket.create({
    gate: gateObject._id,
    plateNumber: vehicleObject._id,
    ticketStatus,
    user: userObject._id,
  });

  // Create ticket
  res.status(200).json(ticket);
});

// @desc Get a Specific ticket
// @route GET /tickets/:id
// @access Private
// export const getTicket = asyncHandler( async (req, res) => {})

// @desc update a ticket
// @route Update /tickets/:id
// @access Private
// @desc delete a ticket
// @route Delete /tickets/:id
// @access Private
// export const getTicket = asyncHandler( async (req, res) => {})
