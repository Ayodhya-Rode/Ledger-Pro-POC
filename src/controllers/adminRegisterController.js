import userRegisterModel from "../model/userRegisterModel.js";
import bcrypt from "bcrypt"


export async function adminRegisterController(req, res) {
   const { name, email, password } = req.body

   /**
    * @desc Register a new user
    * @route /api/admin/register
    */

   //Validation-Checking if all fields are filled
   if(!name || !email || !password){
    return res.status(400).json({message: "All fields are required"})
   }

   //Validation-Checking if user already exists
   const isExits = await userRegisterModel.findOne({email})

   if(isExits){
    return res.status(422).json({message: "User already exists"})
   }

   //Hashing password
   const hashPassword = await bcrypt.hash(password, 10)

   //Creating user
   const user = await userRegisterModel.create({
    name : name,
    email : email, 
    password : hashPassword})

    //Sending response
    res.status(201).json({
        message: "User registered successfully",
        user:user})
    
}
export default adminRegisterController
