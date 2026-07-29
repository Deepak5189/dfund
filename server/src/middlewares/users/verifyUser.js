const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const verifyUser = async (req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken;
        if(!accessToken) return res.status(401).json({
            message: "User is not loggedIn",
        })
    
        const payload = jwt.verify(accessToken, process.env.SECRET);
        // console.log(payload);
    
        const user = await User.findById(payload.id);
        if(!user){
            return res.status(404).json({
                message: "AUthentication Failed! Please login again",
            });
        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({
            message: `Invalid Token: ${err}`,
        });
    }
};

module.exports = {
    verifyUser,
}