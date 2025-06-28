const mongoose=require("mongoose");
const citySchema=new mongoose.Schema({
    cityName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    emoji:{
        type:String,
    },
    date:{
        type:String,
        required:true
    },
    notes:{
        type:String,
    },
    position:{
        lng: {
            type: String,
            required: true
        },
        lat:{
            type:String,
            required:true
        }
    },
    email:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});

module.exports=mongoose.model("City",citySchema,"cities");