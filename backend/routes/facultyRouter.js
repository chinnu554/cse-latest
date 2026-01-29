import express from 'express';
import { getDatabase } from '../config/mongoConnect.js';

const router = express.Router();

router.post("/addFaculty", async (req, res, next) => {
    try {
        const database = getDatabase();
        const Teaching = database.collection("Teaching");
        const { username, role, phoneNo, email } = req.body;

        await Teaching.insertOne({ name: username, role: role, ph: phoneNo, email: email });

        res.status(201).json({ message: "Added successfully" });
    } catch (err) {
        next(err);
    }
});

router.get("/all-teaching", async (req, res, next) => {
    try {
        const database = getDatabase();
        const Teaching = database.collection("Teaching");

        const teachers = await Teaching.find({}).toArray();
        res.status(200).json(teachers);
    } catch (err) {
        next(err);
    }
});

router.get("/all-non-teaching", async (req, res, next) => {
    try {
        const database = getDatabase();
        const NonTeaching = database.collection("Non-Teaching");

        const staff = await NonTeaching.find({}).toArray();
        res.status(200).json(staff);
    } catch (err) {
        next(err);
    }
});

export default router;