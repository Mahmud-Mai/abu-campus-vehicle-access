import express from "express";
import {
  getAllGates,
  createGate,
  deleteGate,
  getGate,
  updateGate,
} from "../controllers/gates.js";

const router = express.Router();

router.route("/").get(getAllGates).post(createGate);
router.route("/:id").get(getGate).patch(updateGate).delete(deleteGate);

export default router;
