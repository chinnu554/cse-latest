import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import connectDB from "./config/mongoConnect.js";
import facultyRouter from "./routes/facultyRouter.js";
import facultyCreate from "./routes/facultyCreate.js";
import pdfRoute from './routes/pdfRoutes.js';
import studentsRouter from './routes/studentsRouter.js';
import LoginRouter from './routes/login.js';
import cloudinaryImages from './routes/cloudinaryImages.js';
import resources from "./routes/resources.js";

dotenv.config();
const app = express();

// Connect to Database
await connectDB();

// Security Middleware
app.use(helmet());
app.use(cors());

// Logging Middleware
app.use(morgan("dev"));

// Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body Parser
app.use(express.json());

// Routes
app.use("/faculty", facultyRouter);
app.use("/facultycreate", facultyCreate);
app.use("/materials", pdfRoute);
app.use("/", studentsRouter);
app.use("/", LoginRouter);
app.use("/", cloudinaryImages);
app.use("/resources", resources);

app.get("/", (req, res) => {
  res.send("Server is running hello devsparks");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
