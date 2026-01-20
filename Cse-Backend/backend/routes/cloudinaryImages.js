import express from "express";
import { getImagesDB } from "../config/mongoConnect.js";
import cloudinary from "../config/cloudinaryConfig.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { uploadImage } from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/upload-slider",
  uploadImage.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const response = await uploadToCloudinary(
        req.file.buffer,
        "slider-images"
      );

      const database = getImagesDB();
      const collection = database.collection("sliderImages");

      const result = await collection.insertOne({
        imageUrl: response.secure_url,
        createdAt: new Date(),
      });

      res.status(201).json({
        message: "Image uploaded successfully",
        url: response.secure_url,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Image upload failed",
        error: err.message,
      });
    }
  }
);

router.get("/slider-images", async (req, res) => {
  try {
    const results = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix: "slider-images/",
      max_results: 100,
    });

    const images = results.resources.map(
      (image) => image.secure_url
    );

    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch images",
      error: err.message,
    });
  }
});

router.post(
  "/upload-gallery",
  uploadImage.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const response = await uploadToCloudinary(
        req.file.buffer,
        "photo-gallery"
      );
      

      res.status(201).json({
        message: "Image uploaded successfully",
        url: response.secure_url,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Image upload failed",
        error: err.message,
      });
    }
  }
);

router.get("/photo-gallery", async (req, res) => {
  try {
    const results = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix: "photo-gallery/",
      max_results: 100,
    });

    const images = results.resources.map(
      (image) => image.secure_url
    );

    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch images",
      error: err.message,
    });
  }
});

export default router;
