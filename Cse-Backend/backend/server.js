import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoConnect.js";
import facultyRouter from "./routes/facultyRouter.js";
import facultyCreate from "./routes/facultyCreate.js";
import pdfRoute from './routes/pdfRoutes.js'
import studentsRouter from './routes/studentsRouter.js'
import LoginRouter from './routes/login.js'

dotenv.config();
const app = express();


await connectDB();

app.use(cors());
app.use(express.json());


app.use("/faculty", facultyRouter);
app.use("/facultycreate", facultyCreate);
app.use("/materials",pdfRoute);
app.use("/",studentsRouter);
app.use("/",LoginRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0", () => console.log(`Server running on port ${PORT}`));
