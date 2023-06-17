import asyncHandler from "express-async-handler";
import Vehicle from "../model/Vehicle.js";

// @desc Get all vehicle
// @route GET /vehicles
// @access Private
export const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find();

  // Check for a match before sending result
  if (!vehicles)
    return res.status(400).json({ message: "Vehicles collection is empty" });

  res.status(200).json(vehicles);
});

// @desc Get a Specific vehicle
// @route GET /vehicles/:id
// @access Private
export const getVehicle = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });

  // Check for match
  const vehicle = await Vehicle.findById(id);
  return res.status(400).json({ message: "No vehicle matches that Id" });

  // Return results
  res.status(200).json(vehicle);
});

// @desc Create a vehicle
// @route Post /vehicles
// @access Private
export const createVehice = asyncHandler(async (req, res) => {
  const { plateNumber } = req.body;

  // Validate user data
  if (!plateNumber)
    return res.status(400).json({ message: "plateNumber was not provided" });

  // Check for a duplicate
  const duplicate = await Vehicle.findOne({ plateNumber }).lean();
  if (duplicate)
    return res.status(409).json({
      message: "Duplicates not allowed. plateNumber is already in Use",
    });

  // Create Vehicle then Return results
  const newVehicle = await Vehicle.create({ plateNumber });
  res.status(201).json({
    message: `Vehicle with plate Number: ${newVehicle.plateNumber} created successfully`,
  });
});

// @desc update a vehicle
// @route Update /vehicles/:id
// @access Private
export const updateVehicle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const [plateNumber] = req.body;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });
  if (!plateNumber)
    return res.status(400).json({ message: "plateNumber was not provided" });

  // Check for duplicate
  const duplicate = await Vehicle.findOne({ plateNumber: plateNumber });
  if (duplicate)
    return res.status(409).json({
      message: "Duplicates not allowed. plateNumber is already in Use",
    });

  // Update Vehicle and Return results
  await Vehicle.findByIdAndUpdate({ plateNumber });
  return res
    .status(201)
    .json({ message: `${plateNumber} was updated succesfully` });
});

// @desc delete a vehicle
// @route Delete /vehicles/:id
// @access Private
export const deleteVehicle = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Validate user data
  if (!id)
    return res.status(400).json({ message: "Please provide a valid Id" });
  // Check for a match
  const vehicleToBeDeleted = await Vehicle.findById(id);
  if (!vehicleToBeDeleted)
    return res.status(400).json({ message: "No vehicle matches that Id" });

  // Delete document and Return result
  await Gate.deleteOne(gateToBeDeleted);
  res.status(201).json({
    message: `${vehicleToBeDeleted.plateNumber} was deleted succesfully`,
  });
});
