import Gate from "../model/Gate.js";

export const getAllGates = async (req, res) => {
  res.status(200).send("Get All Gates is yet to be implemented");
};

export const createGate = async (req, res) => {
  res.status(200).send("Create Gate is yet to be implemented");
};

export const getGate = async (req, res) => {
  res.status(200).send("Get single Gate item is yet to be implemented");
};

export const updateGate = async (req, res) => {
  res.status(200).send("Update Gate is yet to be implemented");
};

export const deleteGate = async (req, res) => {
  res.status(200).send("Delete Gate is yet to be implemented");
};

// try {
//   const gates = await Gate.find;
//   res.send(200).json(gates);
// } catch (error) {
//   res.send(400).json({ message: error });
// }
