import mongoose from "mongoose";

const userRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //stores current valid refresh token
    refreshToken:{
        type: String,
        default: null
    }
})

const userRegisterModel = mongoose.model("userRegisterModel", userRegisterSchema)

export default userRegisterModel