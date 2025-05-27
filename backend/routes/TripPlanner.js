const express = require("express");
const router = express.Router();
const {tripregister}=require("../controllers/userTrip")
router.post("/tripregister",tripregister);
module.exports = router;
