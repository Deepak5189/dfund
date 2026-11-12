const { createPost, getOnePost, getAllPosts } = require("../controllers/post.controller");
const { uploadFile } = require("../middlewares/posts/fileUpload");
const { verifyCreator } = require("../middlewares/posts/verifyCreator");
const { verifyUser } = require("../middlewares/users/verifyUser");

const router = require("express").Router();

router.post(
    "/create-post",
    verifyUser,
    verifyCreator,
    uploadFile,
    createPost
)

router.get(
    "/:id",
    getOnePost,
);

router.get(
    "/",
    getAllPosts,
);

router.get("/health", (req, res)=>{
    res.status(200).json({
        message: "Post routes are healthy",
    })
});

module.exports = router;