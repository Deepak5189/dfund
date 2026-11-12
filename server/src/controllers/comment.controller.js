const { prisma } = require("../config/db");
const {Comment} = require("../models/comment.model");

const postComment = async (req, res)=>{

    try{
        const {campaignId, content, parentCommentId} = req.body.payload;
        const author = req.user || undefined;
        // console.log(author);
        // const comment = new Comment({
        //     campaign,
        //     author,
        //     content,
        //     parentComment
        // });
        // await comment.save();
        // await comment.populate("author", "name");

        const comment = await prisma.comment.create({
            data: {
                campaign_id: campaignId,
                author_id: author.id,
                content: content,
                parent_comment_id: parentCommentId || undefined,
            },
        });
        console.log(comment);
        return res.status(200).json({
            message: "comment created successfully",
            comment,
        })
    }catch(error){
        return res.status(500).json({
            message: `Internal Server Error!: ${error}`,
        });
    }
};

const getCommentReply = async (req, res)=>{
    try{
        const {id} = req.params;        
        const isValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        console.log(isValidUuid);

        if(!isValidUuid){
            return res.status(401).status({
                message: "Invalid parent comment",
                data: null,
            })
        }

        const replies = await prisma.comment.findMany({
            where: {
                parent_comment_id: id,
            },
            orderBy: [
                {created_at: "asc",},
                {updated_at: "asc",},
            ],
            include: {
                author: {
                    select: {
                        name: true,
                        avatar: true,
                    },
                },
            },
        });

        if(!replies){
            return res.status(404).json({
                message: "no replies yet",
                data: replies,
            });
        }

        return res.status(200).json({
            message: "Fetched comments successfully!",
            data: replies,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};


module.exports = {
    postComment,
    getCommentReply,
}