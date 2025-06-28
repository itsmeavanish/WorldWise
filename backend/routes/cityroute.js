const express=require("express");
const router=express.Router();
const {addCity,getCities}=require("../controllers/cities");
const {protect}=require("../middleware/authMiddleware");

router.post("/",protect,addCity);
router.get("/getCities",protect,getCities);
module.exports=router;