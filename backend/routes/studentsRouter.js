import { getDatabase } from "../config/mongoConnect.js";
import express from "express";

const router = express.Router();

router.get("/secondyears", async (req, res, next) => {
    try {
        const database = getDatabase();
        const secondYears = database.collection("secondYears");
        const data = await secondYears.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

router.get("/thirdyears", async (req, res, next) => {
    try {
        const database = getDatabase();
        const thirdYears = database.collection("thirdYears");
        const data = await thirdYears.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

router.get("/fourthyears", async (req, res, next) => {
    try {
        const database = getDatabase();
        const fourthYears = database.collection("fourthYears");
        const data = await fourthYears.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

export default router;