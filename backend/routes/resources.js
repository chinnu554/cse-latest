import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const MATERIALS_DIR = "C:/Users/93953/Desktop/Eshh world/Eswar Edu/Sem 2/Engineering drawing"
router.get("/materials", async (req, res) => {
  try {
    const files = await fs.readdir(MATERIALS_DIR);

    const pdfs = files
      .filter(file => file.endsWith(".pdf"))
      .map(file => ({
        name: file,
        url: `/materials/download/${encodeURIComponent(file)}`
      }));
      console.log(pdfs)
    res.json(pdfs);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to read files" });
  }
});
router.get("/materials/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(MATERIALS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath);
});

export default router;
