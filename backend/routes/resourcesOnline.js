import express from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import r2 from "../config/r2Config.js";
import { uploadPDF } from "../middleware/multer.js";
import { getResourcesDB } from "../config/mongoConnect.js";

const router = express.Router();

/* ===========================
   UPLOAD RESOURCES (EXISTING)
   =========================== */
router.post(
  "/upload-resources",
  uploadPDF.single("pdf"),
  async (req, res) => {
    try {
      const resourcesDb = getResourcesDB();

      if (!req.file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({ error: "Only PDF files allowed" });
      }

      let { year, semester, subject, unit, fileType } = req.body;

      if (!year || !semester || !subject || !fileType) {
        return res.status(400).json({
          error: "Missing required fields",
        });
      }

      year = year.trim();
      semester = semester.trim();
      subject = subject
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();

      fileType = fileType.trim();
      unit = unit?.toString().trim();

      const fileKey = `pdfs/${year}/${semester}/${subject}/Unit-${unit}-${Date.now()}.pdf`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: "application/pdf",
      });

      await r2.send(command);

      const downloadUrl = `${process.env.R2_PUBLIC_URL}/${fileKey}`;

      const wantedCollection = resourcesDb.collection(fileType);

      await wantedCollection.insertOne({
        year,
        semester,
        subject,
        fileType,
        unit,
        fileKey,
        link: downloadUrl,
        createdAt: new Date(),
      });

      return res.status(200).json({
        success: true,
        message: "PDF uploaded successfully",
        fileKey,
        downloadUrl,
      });
    } catch (err) {
      console.error("R2 Upload Error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }
  }
);

/* ===========================
   FETCH RESOURCES (NEW)
   =========================== */
router.get("/:fileType/:year", async (req, res) => {
  try {
    const { fileType, year } = req.params;

    if (!fileType || !year) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const resourcesDb = getResourcesDB();
    const collection = resourcesDb.collection(fileType);

    const resources = await collection
      .find({ year })
      .sort({ createdAt: -1 })
      .toArray();
    console.log(resources);

    return res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (err) {
    console.error("Fetch Resources Error:", err);
    return res.status(500).json({ error: "Failed to fetch resources" });
  }
});

export default router;
