const express = require("express");
const City = require("../models/City");

// Add City
const addCity = async (req, res) => {
  try {
    const { cityName, country, emoji, date, notes, lat, lng, email } = req.body;
    const userId = req.query.userId || req.body.userId; // Get userId from query or body
    console.log("Received data:", userId);
    // Validate input
    if (!cityName || !country || !lat || !lng || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const city = await City.create({
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      email,
      userId
    });

    res.status(201).json(city);
  } catch (error) {
    console.error("Error in addCity:", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
// Get Cities
const getCities=async (req, res) => {
  console.log("hello how are you")
  try {
   const userId = req.query.userId;
   console.log("userIdwjfh",userId);
if (!userId) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid or missing user ID",
            });
        }
    // Fetch cities with optional email filtering
    const cities = await City.find({userId}).sort({ createdAt: -1 });
    if (!cities || cities.length === 0) {
      return res.status(404).json({ message: "No cities found" });
    }

    res.status(200).json(cities);
  } catch (error) {
    console.error("Error in getCities:", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the city ID
        if (!id) {
            return res.status(400).json({
                status: "fail",
                message: "City ID is required",
            });
        }
        // Find and delete the city
        const city = await City.findByIdAndDelete(id);

        if (!city) {
            return res.status(404).json({
                status: "fail",
                message: "City not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "City deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting city:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred while deleting the city",
            error: error.message,
        });
    }
};

module.exports = { addCity, getCities,deleteCity };
