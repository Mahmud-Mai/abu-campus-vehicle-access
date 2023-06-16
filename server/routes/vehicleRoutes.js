import express from "express";
import { getAllVehicles } from "../controllers/vehicles.js";

const router = express.Router();

router.get(getAllVehicles);
export default router;
