import express from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import r2 from "../config/r2Config.js";
import { uploadPDF } from "../middleware/multer.js";
import { getMaterialDB } from "../config/mongoConnect.js";

const router = express.Router();

router.post(
  "/upload-pdf",
  uploadPDF.single("pdf"),
  async (req, res) => {
    
    try {
      const materialsDB = getMaterialDB();

      if (!req.file) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({ error: "Only PDF files allowed" });
      }
     
      let { year, semester,subject, unit, fileType } = req.body;

      if (!year || !semester  || !subject || !fileType) {
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
      unit = unit.toString().trim();


    
      const fileKey = `pdfs/${year}/${semester}/${subject}/Unit-${unit}-${Date.now()}.pdf`;

     
      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileKey,
        Body: req.file.buffer, 
        ContentType: "application/pdf",
      });

      await r2.send(command);

    
      const downloadUrl = `${process.env.R2_PUBLIC_URL}/${fileKey}`;

      const wantedCollection  = materialsDB.collection(`${year}-year`);
      await wantedCollection.insertOne({
        year:year,
        semester:semester,
        subject:subject,
        fileType:fileType,
        unit:unit,
        fileKey:fileKey,
        link:downloadUrl,
        createdAt: new Date(),
      })

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

export default router;
