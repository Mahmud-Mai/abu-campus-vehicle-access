// PACKAGE IMPORTS
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// ROUTE IMPORTS
import ticketsRoutes from "./routes/ticketRoutes.js";

// CONFIGURATIONS
const app = express();
dotenv.config();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Server is working");
});
app.use("/api/v1/tickets", ticketsRoutes);

// START SERVER & CONNECT TO DB
const port = process.env.PORT || 5001;
const db_url = process.env.DATABASE_URI;

const startServer = async () => {
  try {
    await mongoose
      .connect(db_url)
      .then(() =>
        app.listen(port, () =>
          console.log(`server connected to DB. Now listening on port ${5000}`)
        )
      );
  } catch (error) {
    console.log("Encountered an Error", error);
  }
};

startServer();
