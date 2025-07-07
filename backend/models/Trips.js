const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")
const TripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
    },
    strength:{
        type:String,

    },
    budget:{
        type:String,
    },
    startDate:{
        type:String,
    },
    endDate: {
      type: String,
    },
    
    tripType: {
      type: String,
    },
    userId:{
      type:String,
      required:true
    },
    imageUrl:{
      type:String
    }

  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);
module.exports = mongoose.model("Trip", TripSchema);
