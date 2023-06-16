import { Schema } from "mongoose";
import Ticket from "../model/Ticket.js";
import Vehicle from "../model/Vehicle.js";

export const getAllTickets = async (req, res) => {
  res.status(200).send("getAllTickets is yet to be implemented");
  // try {
  //   const ticket = await Ticket.find();
  //   res.send(200).json(tickets);
  // } catch (error) {
  //   res.send(400).json({ message: error });
  // }
};

export const createTicket = async (req, res) => {
  // const newTicket = await Ticket.create(req.body);
  // res.json(newTicket);

  const plateNoOfInterest = req.body.plateNo;
  const vehicleOfInterest = await Vehicle.findOne({
    plateNumber: plateNoOfInterest,
  });

  if (vehicleOfInterest) {
    res.send("Yes VOI exists: " + vehicleOfInterest + " " + true);
  } else {
    res.send("No VOI does not exist: " + vehicleOfInterest + " " + false);
  }
  // const newTicket = await Ticket.create({
  //   plateNumber: plateNoOfInterest,
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // gateId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Gate",
  //   required: true,
  // },
  // });
  //   res.status(200).json(newTicket);
  // } else {
  //   const newVehicle = await Vehicle.create({
  //     plateNumber: plateNoOfInterest,
  //   });

  //   const newTicket = await Ticket.create({
  //     plateNumber: plateNoOfInterest,
  //   });

  //   res
  //     .status(200)
  //     .json(
  //       `New vehicle created: \n ${newVehicle}. \nAnd new ticket created: \n${newTicket}`
  //     );
  // }
};
