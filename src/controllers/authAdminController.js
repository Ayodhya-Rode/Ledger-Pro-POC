import userRegisterModel from "../model/userRegisterModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

/**
 * @desc Register a new user
 * @route POST /api/admin/register 
 */
// Register controller
async function adminRegisterController(req, res) {
    const { name, email, password } = req.body

    //Validation-Checking if all fields are filled
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
            status: "Failed"
        })
    }

    //Validation-Checking if user already exists
    const isExits = await userRegisterModel.findOne({ email })

    if (isExits) {
        return res.status(422).json({
            message: "User already exists",
            status: "Failed"
        })
    }

    //Hashing password
    const hashPassword = await bcrypt.hash(password, 10)

    //Creating user
    const user = await userRegisterModel.create({
        name: name,
        email: email,
        password: hashPassword
    })

    //Sending response
    res.status(201).json({
        message: "User registered successfully",
        user: user,
        status: "Success"
    })

}

// Login controller

async function adminLoginController(req, res) {
    const { email, password } = req.body

    //Validation-Checking if all fields are filled
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
            status: "Failed"
        })
    }

    //Validation-Checking if user exists
    const user = await userRegisterModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            status: "Failed"
        })
    }

    //Checking password
    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid credentials",
            status: "Failed"
        })
    }

    //Generating access  token
    const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    )

    //Generating refresh token
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    )

    //Saving refresh token in database
    user.refreshToken = refreshToken
    await user.save()

    res.cookie("accessToken", accessToken)

    res.cookie("refreshToken", refreshToken)

    //Sending response
    res.status(200).json({
        message: "Login successful",
        status: "Success"
    })


}

// Refresh(rotation) controller

async function adminRefreshController(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({
                message: "No refresh token",
                status: "Failed"
            })
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await userRegisterModel.findById(decoded.id)                

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        //Generating access  token
        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        )

        //Generating Rotate refresh token
        const newRefreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        )

        //Saving refresh token in database
        user.refreshToken = newRefreshToken
        await user.save()

        res.cookie("accessToken", newAccessToken)

        res.cookie("refreshToken", newRefreshToken)

        //Sending response
        res.status(200).json({
            message: "Token rotated successfully",
            status: "Success"
        })


    } catch (error) {
        return res.status(401).json({ message: "Refresh token expired" });
    }
}

// Logout controller

async function logoutController(req, res) {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
        const user = await userRegisterModel.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logged out successfully" });
}


export { adminRegisterController, adminLoginController, adminRefreshController, logoutController }