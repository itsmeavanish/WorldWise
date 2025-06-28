require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileupload = require("express-fileupload");
const app = express();

// PORT Configuration
const PORT = 3000;

// Middleware Configuration
app.use(express.json());
app.use(cors({
    origin: ["https://world-wise-gold-ten.vercel.app"], // Allow requests from frontend origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true // Allow cookies if needed
}));
// Preflight opitions
app.options('*', cors());

// Actual route handler
app.post('/api/auth/login', (req, res) => {
    res.json({ message: 'Login successful!' });
});

app.use(fileupload({
    useTempFiles: true, // Enable temporary file storage
    tempFileDir: "/tmp/" // Temporary directory for uploaded files
}));

// Database Connection
const db = require('./config/database');
db.connect();

// Cloudinary Connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Default Route
app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

// API Route Mounting
const Upload = require("./routes/FileUpload");
const authRoutes = require("./routes/userRoute");
const TripRoutes = require("./routes/TripPlanner");

app.use('/api/auth', authRoutes);
app.use('/api/auth/upload', Upload);
app.use('/api/auth/trips', TripRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!", details: err.message });
});
app.get('/favicon.ico', (req, res) => res.status(204));
// Server Activation
app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});
