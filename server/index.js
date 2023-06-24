// PACKAGE IMPORTS
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";

// ROUTE IMPORTS
import blacklistRoutes from "./routes/blacklistRoutes.js";
import gateRoutes from "./routes/gateRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import notFoundRoute from "./routes/notFoundRoute.js";

// INTERNAL IMPORTS
import { connectToDatabase } from "./config/connectDB.js";
// import Ticket from "./models/Ticket.js";
// import User from "./models/User.js";
// import Gate from "./models/Gate.js";
// import { ticketsData, usersData, gatesData } from "./data/index.js";
// import errorHandler from "./middleware/errorHandler.js"; // Fix custom middleware later

// CONFIGURATIONS
const app = express();
dotenv.config();
connectToDatabase();

// MIDDLEWARE
app.use(cors());
app.use(express.json({ extended: true }));

// ROUTES
app.get("/", (req, res) => {
  res.send("</h1>WELCOME TO CAMPUS VEHICLE ACCESS API</h1>");
});
// app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/blacklists", blacklistRoutes);
app.use("/api/v1/gates", gateRoutes);
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("*", notFoundRoute);

// START SERVER & CONNECT TO DB
const PORT = process.env.PORT || 3001;

// ERROR HANDLER MIDDLEWARE: TO BE IMPORTED AT END(JUST BEFORE APP STARTS TO LISTEN)
// app.use(errorHandler());

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB succesfully");
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
  // Use logger middleware here
});
// Ticket.insertMany(ticketsData);
// User.insertMany(usersData);
// Gate.insertMany(gatesData);
