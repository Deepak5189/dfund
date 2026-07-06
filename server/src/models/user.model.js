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
            trim: true,
        },
        password: {
            type: String,
            required: true,
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

userSchema.index({name: "text"});
module.exports=mongoose.model("User", userSchema);