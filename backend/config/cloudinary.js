const cloudinary=require("cloudinary").v2;
exports.cloudinaryConnect=()=>{
    const CLOUD_NAME="dfstpdwih"
    const API_KEY="364194326781857"
    const API_SECRET="aSqjWfNPVpkq4TFpKwECHUlAA84"
    try{
        cloudinary.config({
            cloud_name:CLOUD_NAME,
            api_key:API_KEY,
            api_secret:API_SECRET,
        })
    }
    catch(error){
        console.log(error)
    }
}