const express=require("express");
const router=express.Router();
const {addCity,getCities}=require("../controllers/citiesController.js");
const {protect}=require("../middlewares/authMiddleware.js");

router.post("/post",addCity);
router.get("/fetch",getCities);
module.exports=router;