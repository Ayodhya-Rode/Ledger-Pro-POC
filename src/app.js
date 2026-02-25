import express from "express";
import adminRegisterRoute from "./routes/adminRegisterRoute.js";



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/admin", adminRegisterRoute)

export default app;