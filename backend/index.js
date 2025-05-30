//app create
require("dotenv").config();
const cors=require("cors")
const express=require("express");
const fileupload=require("express-fileupload");
const app=express();

// PORT find kro 


const PORT=process.env.PORT || 3000;

//midlleware add krna hai  


app.use(express.json());
app.use(cors({
    origin: "https://world-wise-gold-ten.vercel.app", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true // Allow cookies to be sent with requests (if needed)
}));

app.use(
    fileupload({
        useTempFiles: true, // Enables temporary file storage
        tempFileDir: "/tmp/", // Temporary directory for uploaded files
    })
);

// db se connect

const db =require('./config/database');
db.connect()

// cloud se connect 

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mounting
const Upload=require("./routes/FileUpload")
const authRoutes=require("./routes/userRoute");
const TripRoutes = require("./routes/TripPlanner");
app.get("/",
    (req,res)=>{
        res.json("Hello")
    }
)
app.use('/api/auth', authRoutes);
app.use('/api/auth/upload',Upload);
app.use('/api/auth/trips',TripRoutes)
//activating server
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
});