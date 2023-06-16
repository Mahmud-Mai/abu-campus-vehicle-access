// PACKAGE IMPORTS
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// ROUTE IMPORTS
import gateRoutes from "./routes/gateRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import vehicleRoutes from "./routes/vehicleRoutes.js";
import notFoundRoute from "./routes/notFoundRoute.js";

// BULK DATA IMPORTS
import Ticket from "./model/Ticket.js";
import User from "./model/User.js";
import Gate from "./model/Gate.js";
import { ticketsData, usersData, gatesData } from "./data/index.js";

// CONFIGURATIONS
const app = express();
dotenv.config();

// MIDDLEWARE
app.use(cors());
app.use(express.json({ extended: true }));

// ROUTES
app.get("/", (req, res) => {
  res.send("</h1>WELCOME TO CAMPUS VEHICLE ACCESS API</h1>");
});
// app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/tickets", ticketRoutes);
// app.use("/api/v1/users", userRoutes);
app.use("/api/v1/gates", gateRoutes);
app.use("*", notFoundRoute);

// START SERVER & CONNECT TO DB
const port = process.env.PORT || 5001;
const db_url = process.env.DATABASE_URI;

const startServer = async () => {
  try {
    await mongoose
      .connect(db_url)
      .then(() => console.log("MongoDB connected succesfully"));
    app.listen(port, () =>
      console.log(`Server started. Now listening on port ${port}`)
    );
    // Ticket.insertMany(ticketsData);
    // User.insertMany(usersData);
    // Gate.insertMany(gatesData);
  } catch (error) {
    console.log("Encountered an Error", error);
  }
};

startServer();
