const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true, 
            unique: true,
            lowercase: true, 
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        avatar: {
            type: String,
            default: null, 
        },
        isEmailVerified: {
            type: Boolean,
            default: true,  // will be used when implementing email varification
        },
    },
    {
        timestamp: true,
    }
);

userSchema.virtual("campaigns", {
    ref: "Campaign",
    localField: "_id",
    foreignField: "creator", 
});

userSchema.set("toJSON", {virtuals: true, });

userSchema.index({name: "text"});
module.exports=mongoose.model("User", userSchema);