import asyncHandler from "express-async-handler";
import Gate from "../models/Gate.js";

// @desc Get all gates
// @route GET /gates
// @access Private
export const getAllGates = asyncHandler(async (req, res) => {
  const gates = await Gate.find().lean();

  // Confirm gates exists before returning result
  if (!gates?.length)
    return res.status(400).json({ message: "No gates found" });

  res.status(200).send("Get All Gates is yet to be implemented");
});

// @desc Get a Specific user
// @route GET /users/:id
// @access Private
export const getGate = asyncHandler(async (req, res) => {
  res.status(200).send("Get single Gate item is yet to be implemented");
});

// @desc Create a gate
// @route Post /gates
// @access Private
export const createGate = asyncHandler(async (req, res) => {
  res.status(200).json("Create Gate is yet to be implemented");
});

// @desc update a gate
// @route Update /gates/:id
// @access Private
export const updateGate = asyncHandler(async (req, res) => {
  res.status(200).send("Update Gate is yet to be implemented");
});

// @desc delete a gate
// @route Delete /gates/:id
// @access Private
export const deleteGate = asyncHandler(async (req, res) => {
  res.status(200).send("Delete Gate is yet to be implemented");
});

// try {
//   const gates = await Gate.find;
//   res.send(200).json(gates);
// } catch (error) {
//   res.send(400).json({ message: error });
// }
