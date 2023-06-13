import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide your name"],
    min: 5,
    max: 25,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Provide a valid email",
    ],
    min: 10,
    max: 50,
  },
  Password: {
    type: String,
    required: [true, "Password is required"],
    min: 5,
  },
  role: {
    type: String,
    enum: ["School Security", "Admin", "Super Admin"],
    default: "School Security",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
