import express from "express";
import { notFound } from "../controllers/notFound.js";

const router = express.Router();

router.route("/").get(notFound);
export default router;
