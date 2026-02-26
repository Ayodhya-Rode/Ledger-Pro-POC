import express from "express";
import cookieParser from "cookie-parser";
import adminRegisterRoute from "./routes/authAdminRoute.js";
import cors from "cors"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(cookieParser())

app.use("/api/admin", adminRegisterRoute)

export default app;