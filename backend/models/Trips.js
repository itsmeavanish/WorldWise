const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")
const TripSchema = new mongoose.Schema(
  {
    hotelId: {
      type: String,
    },
    name:{
        type:String,

    },
    address:{
        type:String,
    },
    rating:{
        type:Number,
    },
    priceRange: {
      type: String,
    },
    amenities: {
      type: [String],
    },
    distance: {
      type: String,
    },
    description: {
      type: String,
    },
    userId:{
      type:String,
      required:true
    }

  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);
module.exports = mongoose.model("Trip", TripSchema);
