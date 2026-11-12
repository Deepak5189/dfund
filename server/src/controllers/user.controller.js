const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const User = require("../models/user.model");
// const Token = require("../models/token.model");
const {saveLogInfo} = require("../middlewares/logger/logInfo");
// const tokenModel = require("../models/token.model");
const { prisma } = require("../config/db");

const LOG_TYPE = {
    SIGN_IN: "sign in",
    LOGOUT: "logout",
};

const LEVEL = {
    INFO: "info",
    ERROR: "error",
    WARN: "warn",
};

const MESSAGE = {
  SIGN_IN_ATTEMPT: "User attempting to sign in",
  SIGN_IN_ERROR: "Error occurred while signing in user: ",
  INCORRECT_EMAIL: "Incorrect email",
  INCORRECT_PASSWORD: "Incorrect password",
//   DEVICE_BLOCKED: "Sign in attempt from blocked device",
//   CONTEXT_DATA_VERIFY_ERROR: "Context data verification failed",
//   MULTIPLE_ATTEMPT_WITHOUT_VERIFY:
//     "Multiple sign in attempts detected without verifying identity.",
  LOGOUT_SUCCESS: "User has logged out successfully",
};

const getCurrUser = async (req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken;

        if(!accessToken) return res.status(401).json({
            message: "User is not loggedIn",
        })

        const payload = jwt.verify(accessToken, process.env.SECRET);
        console.log(payload);

        const activeSession = prisma.token.findFirst({
            where: {
                access_token: accessToken,
                is_active: true,
            },
        });

        if(!activeSession){
            return res.status(401).json({
                message: "Session has expired or been invalidated on another device",
            });
        }

        // const user = await User.findById(payload.id);

        const user = await prisma.user.findUnique({
            where: {id: payload.id},
        })

        return res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });
    }catch(error){
        return res.status(401).json({
            message: "Invalid or expired session token structure",
        });
    }
};

const signin = async(req, res, next) =>{
    await saveLogInfo(
        req, 
        "user attempting to sign in",
        LOG_TYPE.SIGN_IN,
        LEVEL.INFO,
    )
    console.log("Reached here!!");

    try{
        
        const {email, password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where:{email: email},
        });
        // const existingUser = await User.findOne({
        //     email: {$eq: email},
        // }).select("+password");

        if(!existingUser){
            await saveLogInfo(
                req,
                MESSAGE.INCORRECT_EMAIL,
                LOG_TYPE.SIGN_IN,
                LEVEL.ERROR,
            );

            return res.status(404).json({
                message: "Invalid credentials",
            });
        }

        console.log("password:", password);
        console.log("stored hash:", existingUser.password);

        const isPasswordCorrect = await bcrypt.compare(
            password, 
            existingUser.password
        );

        if(!isPasswordCorrect){
            await saveLogInfo(
                req,
                MESSAGE.INCORRECT_PASSWORD,
                LOG_TYPE.SIGN_IN,
                LEVEL.ERROR
            );

            return res.status(400).json({
                message: "invalid credentials",
            });
        }

        if(!existingUser.is_email_verified){
            await saveLogInfo(
                req, 
                MESSAGE.SIGN_IN_ATTEMPT,
                LEVEL.ERROR
            );

            return res.status(400).json({
                message: "Email not verified yet",
            });
        }

        const payload = {
            id: existingUser.id,
            email: existingUser.email,
            verified: existingUser.is_email_verified,
        };

        const accessToken = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "6h",
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "7d",
        })

        // const newRefreshToken = new Token({
        //     user: existingUser._id,
        //     refreshToken,
        //     accessToken,
        // });
        // await newRefreshToken.save();

        await prisma.token.updateMany({
            where: {
                user_id: existingUser.id,
                is_active: true,
            },
            data: {
                is_active: false,
            },
        })

        const savedToken = await prisma.token.create({
            data: {
                user_id: existingUser.id,
                refresh_token: refreshToken,
                access_token: accessToken,
                is_active: true,
            }
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 6 * 60 * 60 * 1000, // 6 hours
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            accessTokenUpdatedAt: new Date().toLocaleString(),
            user:{
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
            },
        });

    }catch(error){
        await saveLogInfo(
            req, 
            MESSAGE.SIGN_IN_ERROR + error.message,
            LOG_TYPE.SIGN_IN,
            LEVEL.ERROR,
        );

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}

const addUser = async (req, res, next) => {
    let newUser;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // newUser = new User();

    try{
        // await newUser.save();
        newUser = await prisma.user.create({
                data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            }
        });

        if(!newUser) throw new Error("Failed to add user");
        // next(); // This will be used when email varification will be implemented
        return res.status(201).json({
            message: "User created successfully",
        })
    }catch(error){
        return res.status(400).json({
            message: "Failed to add user",
            data:{
                error,
            }
        });
    }
};

const logout = async (req, res) => {
    try{
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;


        if(accessToken){
            // await Token.deleteOne({accessToken});

            await prisma.token.updateMany({
                where: {access_token: accessToken},
                data: {
                    is_active: false,
                }
            });

            await saveLogInfo(
                null, 
                MESSAGE.LOGOUT_SUCCESS,
                LOG_TYPE.LOGOUT,
                LEVEL.INFO,
            );
        }

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return res.status(200).json({
            message: "Logout Successful",
        });
    }catch(error){
        await saveLogInfo(
            null, 
            error.message,
            LOG_TYPE.LOGOUT,
            LEVEL.ERROR,
        );
        return res.status(500).json({
            message: "Internal Server Error. Please try again",
        });
    }
};

module.exports = {
    getCurrUser,
    signin,
    addUser,
    logout
}