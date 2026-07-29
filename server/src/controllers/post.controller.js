const {Campaign} = require("../models/campaign.model");
const User = require("../models/user.model");
// const {User} = require("../models/user.model");

const createPost = async (req, res)=>{
    try{
        // console.log(req.body);
        const {
            creator, 
            title, 
            slug, 
            description, 
            coverImage, 
            category,
            status,
            goalAmount,
            currency,
            deadline,
            storySections,
            updates,
            tags,
        } = req.body;

        const newPost = await Campaign.create({
            creator, title, slug, description, coverImage, category, status, goalAmount, currency, deadline, storySections, updates, tags
        })
        return res.status(201).json({
            message: "Post created successfully",
            post_ref: newPost._id || newPost.slug,
        });
    }catch(err){
        console.error(`Unexpected error when creating Post: ${err}`);
    }
};

const getOnePost = async (req, res)=>{
    try{
        const {id} = req.params;
        // console.log(id);
        const post = await Campaign.findById(id)
                        .populate("creator", "name")
                        .populate({
                            path: "donations",
                            match: {
                                status: "succeeded",
                            },
                            options: {
                                sort: {createdAt: -1},
                                limit: 100,
                            },
                            populate: {
                                path: "donor",
                                select: "name",
                            }
                        })
                        .populate({
                            path: "comments",
                            match: {
                                isHidden: false,
                                parentComment: null,
                            },
                            options: { sort: {createdAt: -1}},
                            populate: {
                                path: "author",
                                select: "name",
                            },
                        });
        // console.log(post);
        return res.status(200).json({
            message: "Post fetched successfully",
            post,
        });
    }catch(error){
        console.error(`got an error when fetching one post: ${error}`)
        return res.status(500).json({
            message: `Internal Sever error: ${error}`,
        });
    }
};

const getAllPosts = async (req, res)=>{
    try{
        const posts = await Campaign.find();
        // console.log(posts);
        if(!posts){
            return res.status(401).json({
                message: "Unexpected Error Occured",
            });
        }
        return res.status(200).json({
            message: "Fetched all posts successfully!",
            data: posts,
        });
    }catch(error){
        console.error(`Got an error when fetching all posts: ${error}`);

        return res.status(500).json({
            message: `Internal Server Error: ${error}`,
        });
    }
}

module.exports = {
    createPost,
    getOnePost,
    getAllPosts,
};