import express from 'express'
import { getDatabase } from '../config/mongoConnect.js'
const router = express.Router();
router.post("/addFaculty",async(req,res)=>{
    const database =  getDatabase();
    const Teaching = database.collection("Teaching");
    try{
        const {username,role,phoneNo,email} = req.body;
        const response = await Teaching.insertOne({name:username,role:role,ph:phoneNo,email:email})
        console.log("data is entered into the db");
        res.status(200).json("Added successully");

    }
    catch(err){
        console.log("Error occured ",err);
        res.status(500).json({message:"iternal error occured"});
    }
})
router.get("/all-teaching", async (req, res) => {
    try {
        const database = getDatabase();
        const Teaching = database.collection("Teaching");

        const teachers = await Teaching.find({}).toArray();
        res.status(200).json(teachers);
    } catch (err) {
        console.error("Error occurred while fetching data:", err);
        res.status(500).json({ message: "Failed to fetch faculty" });
    }
});
router.get("/all-non-teaching", async (req, res) => {
    try {
        const database = getDatabase();
        const Teaching = database.collection("Non-Teaching");

        const teachers = await Teaching.find({}).toArray();
        res.status(200).json(teachers);
    } catch (err) {
        console.error("Error occurred while fetching data:", err);
        res.status(500).json({ message: "Failed to fetch faculty" });
    }
});

export default router