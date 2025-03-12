const { cloudinaryConnect } = require("../config/cloudinary");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// Local File Upload -> Handler Function
exports.localFileUpload = async (req, res) => {
    try {
        // Fetch the file
        const file = req.files.file;
        console.log("Received file:", file);

        // Define the file path
        let path = __dirname + "/files/" + Date.now() + "_" + file.name;

        // Move the file to the desired path
        file.mv(path, (err) => {
            if (err) {
                console.error("Error while saving the file locally:", err);
                return res.status(500).json({
                    success: false,
                    message: "Error while saving the file locally",
                });
            }
            res.json({
                success: true,
                message: "Local File Uploaded Successfully",
            });
        });
    } catch (error) {
        console.error("Failed to upload file locally:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        }); 
    }
};

// Check if file type is supported
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// Upload file to Cloudinary
async function uploadFileToCloudinary(file, folder) {
    const options = {
        folder,
        use_filename: true,
        unique_filename: false,
        resource_type: "auto", // Automatically detect file type
    };

    console.log("Temp file path:", file.tempFilePath);
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}



// Image Upload -> Handler Function
exports.imageUpload = async (req, res) => {
    try {
        // Fetch data from the request
        const { name, tags, email } = req.body;
        console.log("Received data:", { name, tags, email });

        // Fetch the file
        const file = req.files.content;
        console.log("Received file:", file);

        // Validate the file type
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // Upload file to Cloudinary
        console.log("Uploading to Cloudinary...");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log("Cloudinary upload response:", response);

        // Save file data to the database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded",
        });
    } catch (error) {
        console.error("Failed to upload image:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
