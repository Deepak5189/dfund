const mongoose = require("mongoose");
const {Schema} = mongoose;

const commentSchema = new Schema(
    {
        campaign: {
            type: Schema.Types.ObjectId,
            ref: "Campaign",
            required: true,
            index: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        content: {
            type: String, 
            required: true,
            trim: true,
            maxlength: 1000,
        },
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
        isHidden: {
            type: Boolean,
            default: false,
        }, 
    },
    {
        timestamps: true,
    }
);

commentSchema.index({campaign: 1, createdAt: -1});

commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentComment",
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = {Comment};