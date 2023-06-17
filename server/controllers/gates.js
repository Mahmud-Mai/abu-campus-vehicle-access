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

  res.status(200).json(gates);
});

// @desc Get a Specific user
// @route GET /users/:id
// @access Private
export const getGate = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });

  // Check for a match
  const gate = await Gate.findById(id).lean();
  if (!gate)
    return res.status(400).json({ message: "No gate matches that Id" });

  // Return results
  res.status(200).json(gate);
});

// @desc Create a gate
// @route Post /gates
// @access Private
export const createGate = asyncHandler(async (req, res) => {
  const { gateName } = req.body;

  // Validate user data
  if (!gateName)
    return res.status(400).json({ message: "Gatename was not provided" });

  // Check for duplicates
  const duplicate = await Gate.findOne({ gateName: gateName });
  if (duplicate)
    return res
      .status(409)
      .json({ message: "Duplicates not allowed. Gatename is already in Use" });

  // Create Gate, then return results
  const newGate = await Gate.create({ gateName });
  res.status(201).json({ message: `${newGate.gateName} created successfully` });
});

// @desc update a gate
// @route Update /gates/:id
// @access Private
export const updateGate = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { gateName } = req.body;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });
  if (!gateName)
    return res.status(400).json({ message: "Gatename was not provided" });

  // Check for duplicates: to ensure new value is different from old value
  const duplicate = await Gate.findOne({ gateName: gateName });
  if (duplicate)
    return res
      .status(409)
      .json({ message: "Duplicates not allowed. Gatename is already in Use" });

  // Update model
  const updatedGate = await Gate.findByIdAndUpdate(id, { gateName });

  // Send response
  res.status(201).json({ message: `${gateName} was updated succesfully` });
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
