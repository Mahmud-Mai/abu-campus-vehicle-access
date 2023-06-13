import Gate from "../model/Gate.js";

export const getAllGates = async (req, res) => {
  try {
    const gates = await Gate.find;
    res.send(200).json(gates);
  } catch (error) {
    res.send(400).json({ message: error });
  }
};
