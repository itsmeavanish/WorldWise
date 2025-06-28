const express=require("express");
const router=express.Router();
const {addCity,getCities}=require("../controllers/citiesController.js");
const {protect}=require("../middlewares/authMiddleware.js");

router.post("/",protect,addCity);
router.get("/getCities",protect,getCities);
module.exports=router;