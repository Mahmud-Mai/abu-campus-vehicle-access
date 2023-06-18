import express from "express";
import {
  createVehice,
  deleteVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
} from "../controllers/vehicles.js";

const router = express.Router();

router.route("/").get(getAllVehicles).post(createVehice);
router.route("/:id").get(getVehicle).patch(updateVehicle).delete(deleteVehicle);
export default router;
