import express from "express";
import {
  deleteTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  createTicket,
} from "../controllers/tickets.js";

const router = express.Router();

router.route("/").get(getAllTickets).post(createTicket);
router.route("/:id").get(getTicket).patch(updateTicket).delete(deleteTicket);

export default router;
