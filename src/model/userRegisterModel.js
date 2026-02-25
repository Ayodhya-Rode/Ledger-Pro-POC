import mongoose from "mongoose";

const userRegisterSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    
})

const userRegisterModel = mongoose.model("userRegisterModel", userRegisterSchema)

export default userRegisterModel