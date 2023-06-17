import asyncHandler from "express-async-handler";
import Vehicle from "../model/Vehicle.js";

// @desc Get all vehicle
// @route GET /vehicles
// @access Private
export const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find();

  // Check for match before sending result
  if (!vehicles)
    return res.status(400).json({ message: "Vehicles collection is empty" });

  res.status(200).json(vehicles);
});

// @desc Get a Specific user
// @route GET /users/:id
// @access Private
export const getVehicle = asyncHandler(async (req, res) => {});

// // @desc Create a vehicle
// // @route Post /vehicles
// // @access Private
// export const createVehice = asyncHandler (async(req, res) => {

// })

// // @desc update a vehicle
// // @route Update /vehicles/:id
// // @access Private
// export const updateVehicle = asyncHandler (async(req, res) => {

// })

// // @desc delete a vehicle
// // @route Delete /vehicles/:id
// // @access Private
// export const deleteVehicle = asyncHandler (async(req, res) => {

// })
