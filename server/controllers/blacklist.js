import asyncHandler from "express-async-handler";
import Blacklist from "../models/Blacklist";
import Vehicle from "../models/Vehicle";

// @desc Get all blacklist
// @route GET /blacklists
// @access Private
export const getAllBlacklists = asyncHandler(async (req, res) => {
  const blacklists = await Blacklist.find().lean();

  // Check for a match before sending result
  if (!blacklists)
    return res.status(400).json({ message: "Blacklist is empty" });

  res.status(200).json(blacklists);
});

// @desc Get a Specific blacklist
// @route GET /blacklists/:id
// @access Private
export const getBlacklist = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });

  // check For a match
  const blacklist = await Blacklist.findById(id).lean();
  if (!blacklist)
    return res.status(400).json({ message: "No blacklist matches that Id" });

  // Return results
  res.status(200).json(blacklist);
});

// @desc Create a blacklist
// @route Post /blacklists
// @access Private
export const createBlacklist = asyncHandler(async (req, res) => {
  const { vehicle, status, reason } = req.body;

  // Validate user data
  if (!vehicle || !status || !reason)
    return res.status(400).json({ message: "Please provide required fields" });

  // Check for a match
  const vehicleToBlacklist = await Vehicle.findById(vehicle).lean();
  if (!vehicleToBlacklist)
    return res.status(400).json({ message: "No vehicle matches that Id" });

  // Create document
  const blacklistObject = { vehicle, status, reason };
  const result = await Blacklist.create({ blacklistObject });

  // Return result
  res.status(200).json(result);
});

// @desc update a blacklist
// @route Update /blacklists/:id
// @access Private
export const updateBlacklist = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status, reason } = req.body;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });
  if (!status || !reason)
    return res.status(400).json({ message: "Please provide required fields" });

  // Check for a mactch
  const blacklistToUpdate = await Blacklist.findById(id).lean();
  if (!blacklistToUpdate)
    return res.status(400).json({ message: "No blacklist matches that Id" });

  // Update document
  const blacklistObject = { status, reason };
  const result = await Blacklist.findByIdAndUpdate(id, blacklistObject);

  // Return result
  res.status(200).json(result);
});

// @desc delete a blacklist
// @route Delete /blacklists/:id
// @access Private
export const deleteBlacklist = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });
  // Check for a match
  const blaclistToBeDeleted = await Blacklist.findById(id);
  if (!blaclistToBeDeleted)
    return res.status(400).json({ message: "No gate matches that Id" });

  // Delete document
  const deletedGate = await Blacklist.deleteOne(blaclistToBeDeleted);

  // Send response
  res
    .status(201)
    .json({ message: `${blaclistToBeDeleted} was deleted succesfully` });
});
