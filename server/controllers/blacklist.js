import asyncHandler from "express-async-handler";
import Blacklist from "../models/Blacklist";

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
  const blacklist = await Blacklist.findById(id);
  if (!blacklist)
    return res.status(400).json({ message: "No blacklist matches that Id" });

  // Return results
  res.status(200).json(blacklist);
});

// @desc Create a blacklist
// @route Post /blacklists
// @access Private
// export const createBlacklist = asyncHandler(async (req, res) => {});

// @desc update a blacklist
// @route Update /blacklists/:id
// @access Private
// export const updateBlacklist = asyncHandler (async (req, res) => {})

// @desc delete a blacklist
// @route Delete /blacklists/:id
// @access Private
// export const deleteBlacklist = asyncHandler(async (req, res) => {});
