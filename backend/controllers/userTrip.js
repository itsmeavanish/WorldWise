const Trips = require("../models/Trips");
const jwt = require("jsonwebtoken");
const generateToken = (userId) => {
  const JWT_SECRET="ilovenobody"
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

 const tripregister =async function (req,res) {
    try{

        const {address,ammenities,description,distance,id,name,priceRange,rating,userId}=req.body;
        if (!req.body){
         console.log("Credentials Empty")
         alert("Credentials Empty");
        }
        const Trip=await Trips.create({
          userId,
          hotelId:id,
          address,
          name,
          priceRange,
          ammenities,
          distance,
          description,
          rating,
          
        })
        if (Trip) {
         res.status(201).json({
           _id: Trip._id,
           status:201,
           token:generateToken(Trip._id)
         });
       } else {
         res.status(400).json({ message: "Invalid user data" });
         console.log("Hello I am Avanish Upadhyay I am here to configure your issues and how it will be used to solve your issuse , it focuses on your real problems whereas ")
       }
    }
    catch(error){
      console.error(error);
    res.status(500).json({ message: error.message || "Server error" });

    }
 }
 const tripfetch=async function(){
  try{
    const userId = req.query.userId;
    const trips=await Trips.find({userId}).sort({createdAt:-1});
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No trips found" });
    }
    res.status(200).json(trips);
  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
 }
 module.exports={tripregister,tripfetch};