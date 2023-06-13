import Ticket from "../model/Ticket.js";

export const getAllTickets = async (req, res) => {
  try {
    const ticket = await Ticket.find();
    res.send(200).json(tickets);
  } catch (error) {
    res.send(400).json({ message: error });
  }
};
