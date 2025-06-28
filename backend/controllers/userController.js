const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const { cloudinaryConnect } = require("../config/cloudinary");

// Generate JWT Token
const generateToken = (userId) => {
  const JWT_SECRET="ilovenobody"
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

// Upload file to Cloudinary for profile photo
const uploadFileToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: folder,
    });
    return result.secure_url; // Return the URL of the uploaded image
  } catch (err) {
    throw new Error("Cloudinary upload failed");
  }
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body)

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Work for profile photo , uploading to cloudinary 
     
    // Validate file
    const file = req.files?.profilePhoto;
    if (!file) {
      return res.status(400).json({ message: "Profile photo is required" });
    }

    const supportedTypes = ["jpg", "jpeg", "png", "pdf"];
    const fileType = file.name.split(".").pop().toLowerCase();
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({ message: "File format not supported" });
    }

    // Upload profile photo to Cloudinary
    const profilePhotoUrl = await uploadFileToCloudinary(file, "Codehelp");

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      profilePhoto: profilePhotoUrl,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: profilePhotoUrl,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        token: generateToken(user._id),
        message: "Login successful from authRoutes!" 
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get logged-in user's data
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
