const mongoose=require("mongoose");
const fileSchema=new mongoose.Schema({

    name:{
        type:String,
    },
    email:{
        type: String
    },
    imageUrl:{
        type:String
    },
    videoUrl:{
        type:String
    },
    fileUrl:{
        type:String
    },
    tags:{
        type:String
    },
}, {
    timestamps: true
  });
const File=mongoose.model("File",fileSchema)
module.exports=File;