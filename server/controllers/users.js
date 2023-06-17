import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  // Check if users exists before send all users
  if (!users?.length)
    return res.status(400).json({ message: "No users found" });

  res.status(200).json(users);
});

// @desc Create a user
// @route Post /users
// @access Private
export const createUser = asyncHandler(async (req, res) => {
  const { userName, email, password, role, active } = req.body;

  // Confirm data
  if (!userName || !email || !password || !role?.length || !active) {
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
  const id = req.params.id;
  const { userName, email, password, role, active } = req.body;

  // Confrim data id
  if (!userName || !email || !role?.length || active === null || undefined) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  // Confirm useer exists
  const user = await User.findById(id).exec();
  if (!user) return res.status(409).json({ message: "User does not exist" });

  // Create User Object
  const userObject = { userName, role, active };
  if (password) {
    // Hash password
    userObject.password = await bcrypt.hash(password, 10);
  }

  // Save updated user
  const updatedUser = await User.findByIdAndUpdate(id, userObject);
  res
    .status(201)
    .json({ message: `${updatedUser.userName} was updated succesfully` });
});

// @desc delete a user
// @route Delete /users
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Confirm user data
  if (!id) return res.status(400).json({ message: "User Id is not provided" });

  // Check if user has created tickets
  const ticketsUserHasCreated = await Ticket.findOne({ user: id });
  if (ticketsUserHasCreated)
    return res.status(400).json({
      message: "Can't delete user because, User has created some tickets",
    });

  // delete user if user exists
  const user = await User.findById(id);
  if (!user)
    return res.status(400).json({ message: "Can't find a user with that id" });
  const preDeletedUser = user;
  await User.deleteOne(user);

  res.status(200).json({
    message: `Deleted user: ${preDeletedUser.userName} with id: ${preDeletedUser._id} successfully`,
  });
});
