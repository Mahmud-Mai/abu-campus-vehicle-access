import Vehicle from "../model/Vehicle.js";

export const getAllVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();
  if (!vehicles)
    res.status(400).json({ message: "Vehicles collection is empty" });
  res.status(200).json(vehicles);
};
