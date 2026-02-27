import mongoose from "mongoose"

const CustomerSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true,
        unique : true,
        
    }
})

const customerModel = mongoose.model("customerModel", CustomerSchema)

export default customerModel;