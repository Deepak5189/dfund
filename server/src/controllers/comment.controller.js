const {Comment} = require("../models/comment.model");
const postComment = async (req, res)=>{
    try{
        const {campaign, content, parentComment} = req.body?.payload;
        const author = req.user?._id;
        // console.log(author);
        const comment = new Comment({
            campaign,
            author,
            content,
            parentComment
        });
        await comment.save();
        await comment.populate("author", "name");
        // console.log(comment);
        return res.status(200).json({
            message: "comment created successfully",
            comment: comment,
        })
    }catch(error){
        return res.status(500).json({
            message: `Internal Server Error!: ${error}`,
        });
    }
};


module.exports = {
    postComment,
}