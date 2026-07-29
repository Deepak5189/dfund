const mongoose = require("mongoose");
const {Schema} = mongoose;

const storySectionSchema = new Schema({
    heading: {type: String, trim: true, maxlength: 150},
    content: {type: String, required: true, maxlength: 5000},
    image: {type: String, default: null},
    order: {type: Number, default: 0},
},{
    _id: true, timestamps: true,
});

const camapignUpdateSchema = new Schema({
    title: {type: String, required: true, trim: true, maxlength: 150, },
    content: {type: String, required: true, trim: true, maxlength: 5000, },
    image: {type: String, default: null, },
}, {
    _id: true, timestamps: true,
});

const CATEGORIES = ["Medical", "NonProfit", "Creative", "Emergency", ];
const STATUSES = ["Draft", "Active", "Paused", "Completed", "Cancelled"];

const campaignSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 150,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    coverImage: {
        type: String,
        default: null,
    },
    category: {
        type: String,
        enum: CATEGORIES,
        required: true,
        index: true,
    },
    status: {
        type: String,
        enum: STATUSES,
        default: "Draft",
        index: true,
    },
    goalAmount: {
        type: Number,
        required: true,
        min: [1, "Goal Amount must be greater than 0"],
    },
    currency: {
        type: String,
        default: "INR",
        uppercase: true,
        minlength: 3,
        maxlength: 3,
    },
    raisedAmount: {type: Number, default: 0, min: 0, },
    donorsCount: {type: Number, default: 0, min: 0, },
    commentsCount: {type: Number, default: 0, min: 0, },

    deadline: {
        type: Date,
        required: true,
        validate: {
            validator: function (v){
                return this.isNew || v > new Date;
            },
            message: "Deadline must be in future",
        },
    },
    storySections: [storySectionSchema],
    updates: [camapignUpdateSchema],
    isVerified: {type: Boolean, default: false,},
    isFeatured: {type: Boolean, default: false, },
    tags: [{type: String, trim: true, lowercase: true, }],
}, {
    timestamps: true,
});


campaignSchema.index({title: "text", description: "text", tags: "text", });

campaignSchema.index({category: 1, status: 1, createdAt: -1});

campaignSchema.virtual("percentFunded").get(function (){
    if(!this.goalAmount) return 0;

    return Math.min(100, Math.round((this.raisedAmount/this.goalAmount)*100));
});

campaignSchema.virtual("donations", {
    ref: "Donation",
    localField: "_id",
    foreignField: "campaign",
});

campaignSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "campaign",
});

campaignSchema.set("toJSON", {virtuals: true, });
campaignSchema.set("toObject", {virtuals: true, });

const CATEGORY_VALUES = CATEGORIES;
const STATUS_VALUES = STATUSES;

const Campaign =  mongoose.models.campaign || mongoose.model("Campaign", campaignSchema);

module.exports = {
    Campaign,
    CATEGORY_VALUES,
    STATUS_VALUES
};