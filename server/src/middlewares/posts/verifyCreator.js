const User = require("../../models/user.model");

const verifyCreator = async (req, res, next)=>{
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    if(!req.user.isEmailVerified){
        return res.status(403).json({
            message: "Your Email must be verified for posting content",
        })
    }
    req.body.creator = req.user._id;
    next();
};

module.exports = {
    verifyCreator
}