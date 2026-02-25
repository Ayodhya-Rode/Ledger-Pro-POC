import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDB from "./src/DB/db.js";

connectToDB();



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening`)
})