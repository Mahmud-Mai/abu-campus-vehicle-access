import { Schema } from "mongoose";
import Ticket from "../models/Ticket.js";
import Vehicle from "../models/Vehicle.js";
import asyncHandler from "express-async-handler";
asyncHandler;

// @desc Get all gates
// @route GET /gates
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

// @desc Create a gate
// @route Post /gates
// @access Private
// export const createTicket = asyncHandler(async (req, res) => {
//   // const newTicket = await Ticket.create(req.body);
//   // res.json(newTicket);

//   const plateNoOfInterest = req.body.plateNo;
//   const vehicleOfInterest = await Vehicle.findOne({
//     plateNumber: plateNoOfInterest,
//   });

//   if (vehicleOfInterest) {
//     res.send("Yes VOI exists: " + vehicleOfInterest + " " + true);
//   } else {
//     res.send("No VOI does not exist: " + vehicleOfInterest + " " + false);
//   }
// });

// @desc Get a Specific gate
// @route GET /gates/:id
// @access Private
// export const getTicket = asyncHandler( async (req, res) => {})

// @desc update a gate
// @route Update /gates/:id
// @access Private
// @desc delete a gate
// @route Delete /gates/:id
// @access Private
// export const getTicket = asyncHandler( async (req, res) => {})
