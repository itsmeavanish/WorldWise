const express=require("express");
const router=express.Router();
const {addCity,getCities,deleteCity}=require("../controllers/citiesController.js");
const {protect}=require("../middlewares/authMiddleware.js");

router.post("/post",addCity);
router.get("/fetch",getCities);
router.delete("/delete/:id", deleteCity);
module.exports=router;