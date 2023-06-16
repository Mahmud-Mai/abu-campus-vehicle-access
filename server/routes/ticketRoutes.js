import express from "express";
import { createTicket, getAllTickets } from "../controllers/tickets.js";

const router = express.Router();

router.route("/").get(getAllTickets).post(createTicket);

export default router;
