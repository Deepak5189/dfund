const { postComment, getCommentReply } = require("../controllers/comment.controller");
const { verifyCreator } = require("../middlewares/posts/verifyCreator");
const { verifyUser } = require("../middlewares/users/verifyUser");

const router = require("express").Router();

router.post(
    "/",
    verifyUser,
    verifyCreator,
    postComment,
);

router.get(
    "/:id",
    verifyUser,
    getCommentReply,
);

router.get("/health", (req, res)=>{
    return res.status(200).json({
        message: "Comment routes are healthy"
    });
});


module.exports=router;