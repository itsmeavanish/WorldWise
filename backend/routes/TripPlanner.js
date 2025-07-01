const express = require("express");
const router = express.Router();
const {tripregister,tripfetch}=require("../controllers/userTrip")
router.post("/tripregister",tripregister);
router.post("/fetch",tripfetch);
module.exports = router;
