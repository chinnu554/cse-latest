import multer from "multer";
const storage = multer.memoryStorage();

export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

export const uploadPDF = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, 
});
