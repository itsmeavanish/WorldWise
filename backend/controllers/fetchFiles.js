const File = require("../models/File");

exports.fetchFile = async(req, res) => {
    try{
        const files = await File.find();
        console.log(files);
        
        return res.status(200).json({
            success:true,
            message:"Done",
            files,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while fetching files"
        })
        
    }
}