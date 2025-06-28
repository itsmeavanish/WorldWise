const express = require("express");
const City = require("../models/City");

// Add City
const addCity = async (req, res) => {
  try {
    const { cityName, country, emoji, date, notes, lat, lng, email } = req.body;

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
    });

    res.status(201).json(city);
  } catch (error) {
    console.error("Error in addCity:", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get Cities
const getCities = async (req, res) => {
  try {
    const { email } = req.query;

    // Fetch cities with optional email filtering
    const cities = await City.find().sort({ date: -1 });

    if (!cities || cities.length === 0) {
      return res.status(404).json({ message: "No cities found" });
    }

    res.status(200).json(cities);
  } catch (error) {
    console.error("Error in getCities:", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { addCity, getCities };
