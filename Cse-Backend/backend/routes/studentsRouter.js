import { getDatabase } from "../config/mongoConnect.js";
import express from "express";
const router =  express.Router();
router.get("/secondyears",async(req,res)=>{
    try{
        const database = getDatabase();
        const secondYears = database.collection("secondYears");
        const data = await secondYears.find({}).toArray();
        res.status(201).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json("Cant fetch the data of the students")
    }
})
router.get("/thirdyears",async(req,res)=>{
    try{
        const database = getDatabase();
        const secondYears = database.collection("thirdYears");
        const data = await secondYears.find({}).toArray();
        res.status(201).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json("Cant fetch the data of the students")
    }
})
router.get("/fourthyears",async(req,res)=>{
    try{
        const database = getDatabase();
        const secondYears = database.collection("fourthYears");
        const data = await secondYears.find({}).toArray();
        res.status(201).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json("Cant fetch the data of the students")
    }
})
export default router;