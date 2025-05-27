const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")

const TripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
    },
    date:{
        type:String,

    },
    Strength:{
        type:String,
    },
    TripType:{
        type:String,
    },
    email:{
      type:String,
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);
module.exports = mongoose.model("Trip", TripSchema);
