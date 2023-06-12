// PACKAGE IMPORTS
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// CONFIGURATIONS
const app = express();
dotenv.config();

// ROUTES
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Connect to DB and Start listening
const port = PORT || 5001;
app.listen(port, () => console.log("server is listening on port 5000"));
