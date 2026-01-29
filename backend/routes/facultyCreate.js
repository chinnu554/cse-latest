import express from "express";
import { uploadImage } from "../middleware/multer.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { getDatabase } from "../config/mongoConnect.js";

const router = express.Router();

router.post("/uploadTeaching", uploadImage.single("image"), async (req, res, next) => {
  try {
    const database = getDatabase();
    const Teaching = database.collection("Teaching");

    const { username, role, email } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image = await uploadToCloudinary(req.file.buffer, "admin-users");

    const userData = {
      username,
      role,
      email,
      imageUrl: image.secure_url,
      imageId: image.public_id,
    };

    await Teaching.insertOne(userData);

    res.status(201).json({
      success: true,
      message: "Teaching staff added successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
});


router.post("/uploadNonTeaching", uploadImage.single("image"), async (req, res, next) => {
  try {
    const database = getDatabase();
    const NonTeaching = database.collection("Non-Teaching");

    const { username, role, phoneno, email } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image = await uploadToCloudinary(req.file.buffer, "admin-users");

    const userData = {
      username,
      role,
      phoneno,
      email,
      imageUrl: image.secure_url,
      imageId: image.public_id,
    };

    await NonTeaching.insertOne(userData);

    res.status(201).json({
      success: true,
      message: "Non-teaching staff added successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
