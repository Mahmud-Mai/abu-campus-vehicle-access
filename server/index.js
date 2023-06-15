// PACKAGE IMPORTS
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// ROUTE IMPORTS
import ticketsRoutes from "./routes/ticketRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import gatesRoutes from "./routes/gatesRoutes.js";

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
app.use(bodyParser.json());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("</h1>WELCOME TO CAMPUS VEHICLE ACCESS API</h1>");
});
app.use("/api/v1/tickets", ticketsRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("./api/v1/gates", gatesRoutes);

// START SERVER & CONNECT TO DB
const port = process.env.PORT || 5001;
const db_url = process.env.DATABASE_URI;

const startServer = async () => {
  try {
    await mongoose.connect(db_url).then(() => {
      app.listen(port, () =>
        console.log(`server connected to DB. Now listening on port ${5000}`)
      );
      // Ticket.insertMany(ticketsData);
      // User.insertMany(usersData);
      // Gate.insertMany(gatesData);
    });
  } catch (error) {
    console.log("Encountered an Error", error);
  }
};

startServer();
