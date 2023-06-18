import asyncHandler from "express-async-handler";
import Blacklist from "../models/Blacklist.js";
import Vehicle from "../models/Vehicle.js";

// @desc Get all blacklist
// @route GET /blacklists
// @access Private
export const getAllBlacklists = asyncHandler(async (req, res) => {
  const blacklists = await Blacklist.find();

  // Check for a match before sending result
  if (!blacklists?.length)
    return res.status(400).json({ message: "Blacklist is empty" });

  // Populate the plate number from the associated vehicle
  const populatedBlacklists = await Promise.all(
    blacklists.map(async (blacklist) => {
      await blacklist.populate("vehicle", "plateNumber");

      const plateNumber = blacklist.vehicle
        ? blacklist.vehicle.plateNumber
        : null;

      return {
        ...blacklist.toObject(),
        plateNumber,
      };
    })
  );

  // Return result with the plate number included
  res.status(200).json(populatedBlacklists);
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

  // Populate the plate number from the associated vehicle
  await blacklist.populate("vehicle", "plateNumber");

  // Return result with the plate number included
  const { vehicle: blacklistedVehicle, ...result } = blacklist.toObject();
  result.plateNumber = blacklistedVehicle
    ? blacklistedVehicle.plateNumber
    : null;

  res.status(200).json(result);
});

// @desc Create a blacklist
// @route Post /blacklists
// @access Private
export const createBlacklist = asyncHandler(async (req, res) => {
  const { vehicle, status, reason } = req.body;

  // Validate user data
  if (!vehicle || !status || !reason)
    return res.status(400).json({ message: "Please provide required fields" });

  // Check for duplicate
  const duplicate = await Blacklist.findOne({ vehicle });
  if (duplicate) {
    return res.status(400).json({ message: "Vehicle is already blacklisted" });
  }

  // Check for a match
  const vehicleToBlacklist = await Vehicle.findById(vehicle);

  if (!vehicleToBlacklist)
    return res.status(400).json({ message: "No vehicle matches that Id" });

  // Create document
  const blacklist = await Blacklist.create({ vehicle, status, reason });

  // Populate the plate number from the associated vehicle
  await blacklist.populate("vehicle", "plateNumber");

  // Return result including plate Number
  const { vehicle: blacklistedVehicle, ...result } = blacklist.toObject();

  // Check if vehicle is null
  result.plateNumber = blacklistedVehicle
    ? blacklistedVehicle.plateNumber
    : null;

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
  const updatedBlacklist = await Blacklist.findByIdAndUpdate(
    id,
    blacklistObject
  );

  // Populate plate Number
  await updatedBlacklist.populate("vehicle", "plateNumber");

  // Return result including plate Number
  const { vehicle: blacklistedVehicle, ...result } =
    updatedBlacklist.toObject();

  // Check if vehicle is null
  result.plateNumber = blacklistedVehicle
    ? blacklistedVehicle.plateNumber
    : null;

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
