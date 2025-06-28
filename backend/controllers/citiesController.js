const express=require("express");
const City=require("../models/City");

const addCity=async(req,res)=>{
    try{
        const {cityName,country,emoji,date,notes,position:{lat,lng},email}=req.body;
        console.log(req.body);
        const cities=await City.create({
            cityName,
            country,
            emoji,
            date,
            notes,
            position:{
                lat,
                lng
            },
            email
        });
        if(cities){
            res.status(201).json({
                _id:cities._id,
                cityName:cities.cityName,
                country:cities.country,
                emoji:cities.emoji,
                date:cities.date,
                notes:cities.notes,
                position:cities.position,
                email:cities.email
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
            }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:error.message || "Server error"});
    }
}
const getCities=async(req,res)=>{
    try{
        const {email}=req.query;
        const cities = await City.find().sort({ date: -1 });
        if (cities && cities.length > 0) {
            res.status(200).json(cities);
        }
        else {
            res.status(404).json({ message: "No cities found for this user" });
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:error.message || "Server error"});
        
    }
}

module.exports={addCity,getCities};