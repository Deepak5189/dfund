const { prisma } = require("../config/db");
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


        const newPost = await prisma.campaign.create({
            data:{
                creator_id: creator,
                title: title,
                slug: slug,
                description: description,
                cover_image: coverImage || undefined,
                category: category,
                status: status || undefined,
                tags: tags || undefined,
                goal_amount: goalAmount,
                currency: currency || undefined,
                deadline: deadline,

                updates: updates && updates.length>0 ? {
                    create: updates.map((update, i)=>({
                        title: update.title,
                        content: update.content,
                        image: update.image || null,
                    }))
                }:undefined,

                story_sections: storySections && storySections.length>0?{
                    create: storySections.map((section, i)=>({
                        heading: section.heading || null,
                        content: section.content,
                        image: section.image || null,
                        sort_order: i
                    }))
                }: undefined,
            },
            include: {
                story_sections: true,
                updates: true,
            }
        });

        console.log(newPost);

        return res.status(201).json({
            message: "Post created successfully",
            post_ref: newPost.id || newPost.slug,
        });
    }catch(err){
        console.error(`Unexpected error when creating Post: ${err}`);
        return res.status(500).json({
            message: "Internal Server error",
            error: err,
        });
    }
};

const getOnePost = async (req, res)=>{
    try{
        const {id} = req.params;
        const isValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        
        const post = await prisma.campaign.findFirst({
            where: isValidUuid
            ? {
                OR:[
                    {slug: id,},
                    {id: id,},
                ]
            } :{
                slug: id,
            },
            include: {
                creator: {
                    select:{
                        name: true,
                    },
                },
                story_sections: {
                    orderBy:[
                        {created_at: "asc",},
                        {sort_order: "asc",},
                    ],
                },
                updates: true,
                donations: {
                    where:{
                        status: "successful",
                    },
                    orderBy:{
                        created_at: 'desc',
                    },
                    take: 100,
                    include: {
                        donor: {
                            select: {name: true,},
                        },
                    },
                },
                comments: {
                    where: {
                        is_hidden: false,
                        parent_comment_id: null,
                    },
                    orderBy:{
                        created_at: "desc",
                    },
                    include: {
                        author: {
                            select: {name: true,},
                        },
                    },
                },
            },
        });

        if(!post){
            return res.status(404).json({
                message: "Post not found",
                post_identifier: id,
            });
        }

        console.log(post);
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;

        const posts = await prisma.campaign.findMany({
            skip: skip,
            take: limit,
            orderBy:{
                created_at: "desc",
            },
            include: {
                creator: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        // console.log(posts);
        if(posts.length ===0){
            return res.status(401).json({
                message: "No campaigns found matching criteria",
                data: [],
            });
        }
        return res.status(200).json({
            message: "Fetched all posts successfully!",
            page,
            limit,
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