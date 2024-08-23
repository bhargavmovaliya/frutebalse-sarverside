
const Users = require("../models/users.models");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const sendMail = require("../utliy/nodemailer");

const createToken = async (id) => {
    try {
        const user = await Users.findById(id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const accessToken = await jwt.sign(
            {
                _id: user._id,
                role: user.role,
                expiresIn: "1 hours"
            },
            process.env.ACCESSTOKEN,
            { expiresIn: 3600 }
        )

        const refreshToken = await jwt.sign(
            { _id: id },
            process.env.REFRESHTOKEN,
            { expiresIn: '10 day' }
        )

        user.refreshToken = refreshToken
        console.log(user);

        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error.message);
    }
}

const ragister = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);


        const { email, password } = req.body

        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (user) {
            return res.status(409).json({
                success: false,
                message: "user alredy exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const userData = await Users.create({ ...req.body, password: hashPassword, }) //avtar: req.file.path

        if (!userData) {
            return res.status(500).json({
                success: false,
                message: "create hash password error"
            })
        }

        const userDataF = await Users.findById({ _id: userData._id }).select("-password")

        if (!userDataF) {
            return res.status(500).json({
                success: false,
                message: "internal server error" + error.message
            })
        }
        //after ragistartion is complet mail sended
        // await sendMail(email)

        res.status(201).json({
            success: true,
            message: "ragister succesfully",
            data: userDataF
        })




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}
const ragisterOTP = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "otp ragister successfully ."
    })
}

const verifyotp = async (req, res) =>{
    res.status(200).json({
        success: true,
        message: "otp verify successfully ."
    })
}
const login = async (req, res) =>{
    try {
        const { email, password } = req.body

        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "invalid cradintioal"
            })
        }

        const { accessToken, refreshToken } = await createToken(user._id)

        console.log({ accessToken, refreshToken });

        const userDataF = await Users.findById({ _id: user._id }).select("-password -refreshToken")

        const optionAcc = {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000
        }

        const optionRef = {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 10 * 1000
        }

        res.status(200)
            .cookie("accessToken", accessToken, optionAcc)
            .cookie("refreshToken", refreshToken, optionRef)
            .json({
                success: true,
                message: "login successfull",
                data: {
                    ...userDataF.toObject(),
                    accessToken,
                }
            })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const generateNewTokens = async (req, res) => {
    try {

        req.cookies.refreshToken
        console.log(req.cookies.refreshToken);
        if (!req.cookies.refreshToken) {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }

        const verifyToken = await jwt.verify(req.cookies.refreshToken, process.env.REFRESHTOKEN)
        console.log(verifyToken);

        if (!verifyToken) {
            return res.status(400).json({
                success: false,
                message: "invalid token"
            })
        }

        const user = await Users.findById(verifyToken._id)
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Define"
            })
        }

        if (req.cookies.refreshToken != user.toObject().refreshToken) {
            return res.status(400).json({
                success: false,
                message: "invalid token"
            })
        }

        const { accessToken, refreshToken } = await createToken(user._id)

        const option = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                success: true,
                message: "Refresh Token successfull",
                data: {
                    accessToken,
                }
            })





    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        console.log(req.body._id);

        const user = await Users.findByIdAndUpdate(
            req.body._id,
            {
                $unset: { refreshToken: 1 }
            },
            {
                new: true
            }
        )

        console.log(user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not logout"
            })
        }

        res.status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({
                success: true,
                message: "User Logged Out"
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }

}
const chakAuth = async (req, res) =>{
    try {
        const accessToken = await req.cookies.accessToken
        console.log("accessToken",accessToken);

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Token Not Found"
            })
        }

        const verifyUser = await jwt.verify(accessToken, process.env.ACCESSTOKEN)
        console.log("verifyUser",verifyUser);
        

        if (!verifyUser) {
            return res.status(400).json({
                success: false,
                message: "Token Expire Or Invalid"
            })
        }

        res.status(200).json({
            success: true,
            data: verifyUser,
            message: "User Authenticated",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}



module.exports = {
    ragister,
    ragisterOTP,
    verifyotp,
    login,
    generateNewTokens,
    logout,
    chakAuth,
    createToken

}

