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

  // Validate user data
  if (!plateNumber || !gate || !ticketStatus || !user)
    return res.status(400).json({ message: "Please provide required fields" });

  // Check if vehicle exists
  const vehicleObject = await Vehicle.findById(plateNumber);
  if (!vehicleObject)
    return res
      .status(400)
      .json({ message: "The plateNumber provided is not in the Database" });

  // Check vehicle has no open tickets
  const ticketObject = await Ticket.findOne({ plateNumber: plateNumber });
  const previousOpenTickets = ticketObject
    ? ticketObject.ticketStatus === "Inbound"
    : false;

  if (previousOpenTickets)
    return res
      .status(400)
      .json({ message: "Vehicle already has an open ticket" });

  // Check if gate exists
  const gateObject = await Gate.findOne({ gateName: gate });
  if (!gateObject) {
    return res
      .status(400)
      .json({ message: "The gate provided is not in the Database" });
  }

  // Check if user exists
  const userObject = await User.findOne({ userName: user });
  if (!userObject) {
    return res
      .status(400)
      .json({ message: "The user provided is not in the Database" });
  }

  // Create Ticket
  const ticket = await Ticket.create({
    plateNumber,
    gate: gateObject._id,
    ticketStatus,
    user: userObject._id,
  });

  // Populate plateNumber, user, gate fields, I'm using multiple await and populate combo, bcoz single chaining didn't work
  await ticket.populate("plateNumber", "plateNumber");
  await ticket.populate("user", "userName");
  await ticket.populate("gate", "gateName");

  // Include populated items in the resul
  const {
    plateNumber: plateNoContainer,
    user: userContainer,
    gate: gateContainer,
    ...result
  } = ticket.toObject();
  result.plateNumber = plateNoContainer ? plateNoContainer.plateNumber : null;
  result.user = userContainer ? userContainer.userName : null;
  result.gate = gateContainer ? gateContainer.gateName : null;

  // Return response
  res.status(200).json(result);
});

// @desc Get a Specific ticket
// @route GET /tickets/:id
// @access Private
export const getTicket = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });

  // Check for match
  const ticket = await Ticket.findById(id);
  if (!ticket)
    return res.status(400).json({ message: "No ticket matches that Id" });

  // Populate plateNumber, user, gate fields, I'm using multiple await and populate combo, bcoz single chaining didn't work
  await ticket.populate("plateNumber", "plateNumber");
  await ticket.populate("user", "userName");
  await ticket.populate("gate", "gateName");

  // Include populated items in the resul
  const {
    plateNumber: plateNoContainer,
    user: userContainer,
    gate: gateContainer,
    ...result
  } = ticket.toObject();
  result.plateNumber = plateNoContainer ? plateNoContainer.plateNumber : null;
  result.user = userContainer ? userContainer.userName : null;
  result.gate = gateContainer ? gateContainer.gateName : null;

  // Return response
  res.status(200).json(result);
});

// @desc update a ticket
// @route Update /tickets/:id
// @access Private
export const updateTicket = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { exitTime, ticketStatus } = req.body;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });
  if (!exitTime || !ticketStatus)
    return res.status(400).json({ message: "Please provide required fields" });

  // Check for a match
  const ticket = await Ticket.findById(id);
  if (!ticket)
    return res.send(400).json({ message: "No ticket matches that Id" });

  // Populate Ticket plate No, to display in result
  await ticket.populate("plateNumber", "plateNumber");
  const { plateNumber: plateNoContainer, ...result } = ticket.toObject();
  result.plateNumber = plateNoContainer ? plateNoContainer.plateNumber : null;
  // Update Vehicle and Return results
  await Ticket.findByIdAndUpdate(id, {
    exitTime: exitTime,
    ticketStatus: ticketStatus,
  });
  res.status(201).json({
    message: `Ticket ${result._id} with plate number: ${result.plateNumber} was updated succesfully`,
  });
});

// @desc delete a ticket
// @route Delete /tickets/:id
// @access Private
export const deleteTicket = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });

  // Check for a match
  const ticketToDelete = await Ticket.findById(id);
  if (!ticketToDelete)
    return res.status(400).json({ message: "Ticket does not exits" });

  // Delete ticket
  await Ticket.findByIdAndRemove(id);
  //Send response
  res.status(201).json({
    message: `${ticketToDelete} was deleted succesfully`,
  });
});
