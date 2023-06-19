import express from "express";
import {
  createBlacklist,
  deleteBlacklist,
  getAllBlacklists,
  getBlacklist,
  updateBlacklist,
} from "../controllers/blacklist.js";

const router = express.Router();

router.route("/").get(getAllBlacklists).post(createBlacklist);
router
  .route("/:id")
  .get(getBlacklist)
  .patch(updateBlacklist)
  .delete(deleteBlacklist);

export default router;
