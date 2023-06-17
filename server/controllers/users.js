import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  // Confirm data
  if (!users) return res.status(400).json({ message: "No users found" });
  res.status(200).json(users);
});

// @desc Create a user
// @route Post /users
// @access Private
export const createUser = asyncHandler(async (req, res) => {
  const { userName, email, password, role, active } = req.body;
  // Confirm data
  if (
    !userName ||
    !email ||
    !password ||
    !Array.isArray(role) ||
    !role.length ||
    !active
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicates
  const duplicate = await User.findOne({ email }).lean();
  if (duplicate)
    return res.status(409).json({ message: "Email already in use" }); // 409 means conflict

  // Hash password and create user
  const hashedPwd = await bcrypt.hash(password, 10);
  const userObject = { userName, email, password: hashedPwd, role, active };
  const newUser = await User.create(userObject);

  if (newUser) {
    res
      .status(201)
      .json({ message: `New User: ${userName} was created succesfully` });
  } else {
    res.status(400).json({ message: `Invalid User data received` });
  }
});

// @desc update a user
// @route Update /users
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
  const { id, userName, email, password, role, active } = req.body;
  // Confrim data
  if (
    !id ||
    !userName ||
    !email ||
    !password ||
    !Array.isArray(role) ||
    !role.lenth ||
    !active
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm useer exists
  const user = await User.findById(id);
  if (!user) return res.status(409).json({ message: "User does not exist" });

  User.userName = userName;
  User.role = role;
  User.active = active;

  if (password) {
    // Hash password

    User.password = await bcrypt.hash(password, 10);
  }

  // Save updated user
  const updatedUser = await User.save();

  res
    .status(201)
    .json({ message: `${updateUser.userName} was updated succesfully` });
});

// Save updated user

// @desc delete a user
// @route Delete /users
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {});
