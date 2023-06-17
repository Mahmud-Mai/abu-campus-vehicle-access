import express from "express";
import {
  getAllUsers,
  getSpecificUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getSpecificUser).patch(updateUser).delete(deleteUser);

export default router;
