import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import connectDB from "./config/mongoConnect.js";
import facultyRouter from "./routes/facultyRouter.js";
import facultyCreate from "./routes/facultyCreate.js";
import resourcesOnline from './routes/resourcesOnline.js';
import studentsRouter from './routes/studentsRouter.js';
import LoginRouter from './routes/login.js';
import cloudinaryImages from './routes/cloudinaryImages.js';
import resources from "./routes/resources.js";

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(morgan("dev"));



app.use(express.json());

app.use("/faculty", facultyRouter);
app.use("/facultycreate", facultyCreate);
app.use("/resources", resourcesOnline);
app.use("/students", studentsRouter);
app.use("/auth", LoginRouter);
app.use("/images", cloudinaryImages);
app.use("/resources", resources);

app.get("/", (req, res) => {
  res.send("Server is running hello devsparks");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
}

startServer();
