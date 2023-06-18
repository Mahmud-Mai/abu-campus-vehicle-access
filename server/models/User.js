import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import { SequenceFactory } from "mongoose-sequence";
// const AutoIncrement = SequenceFactory(mongoose);

const UserSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: [true, "Password is required"],
      min: 5,
    },
    role: {
      type: String,
      enum: ["Security", "Admin", "Super Admin"],
      default: "Security",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// UserSchema.plugin(AutoIncrement, {
//   inc_field: "userNums",
//   id: "userId",
//   start_seq: 1,
// });

const User = mongoose.model("User", UserSchema);
export default User;
