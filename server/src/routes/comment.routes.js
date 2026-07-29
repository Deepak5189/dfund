const { postComment } = require("../controllers/comment.controller");
const { verifyCreator } = require("../middlewares/posts/verifyCreator");
const { verifyUser } = require("../middlewares/users/verifyUser");

const router = require("express").Router();

router.get("/health", (req, res)=>{
    return res.status(200).json({
        message: "Comment routes are healthy"
    })
})

router.post(
    "/",
    verifyUser,
    verifyCreator,
    postComment,
)

module.exports=router;