const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const {saveLogInfo} = require("../middlewares/logger/logInfo")

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
        const existingUser = await User.findOne({
            email: {$eq: email},
        });

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

            res.status(400).json({
                message: "invalid credentials",
            });
        }

        const payload = {
            id: existingUser._id,
            email: existingUser.email,
        };

        const accessToken = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "6h",
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "7d",
        })

        const newRefreshToken = new Token({
            user: existingUser._id,
            refreshToken,
            accessToken,
        });
        await newRefreshToken.save();

        res.status(200).json({
            accessToken,
            refreshToken,
            accessTokenUpdatedAt: new Date().toLocaleString(),
            user:{
                _id: existingUser._id,
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

        res.status(500).json({
            message: "Something went wrong",
        });
    }
}

const addUser = async (req, res, next) => {
    let newUser;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try{
        await newUser.save();

        if(newUser.isNew) throw new Error("Failed to add user");
        // next();
        res.status(201).json({
            message: "User created successfully",
        })
    }catch(error){
        res.status(400).json({
            message: "Failed to add user",
        });
    }
};

module.exports = {
    signin,
    addUser,
}