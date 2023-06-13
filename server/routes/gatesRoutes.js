import express from "express";
import { getAllGates } from "../controllers/gates.js";

const router = express.Router();

router.get(getAllGates);

export default router;
