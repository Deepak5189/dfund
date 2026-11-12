const mongoose = require("mongoose");
const {Schema} = mongoose;

const donationSchema = new Schema({
    campaign: {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
        index: true,
    },
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
        index: true,
    },
    guestName: {type: String, trim: true, maxlength: 100, },
    guestEmail: {type: String, trim: true, lowercase: true, },
    amount: {type: Number, required: true, min: [1, "amount must be > 0"], },
    currency: {type: String, default: "INR", uppercase: true, },
    message: {type: String, maxlength: 500, trim: true, },
    isAnonymous: {type: Boolean, default: false, },
    status: {
        type: String,
        enum: ["pending", "succeeded", "failed", "refunded", ],
        default: "pending",  
        index: true,
    },
    paymentProvider: {type: String, },
    paymentIntentId: {type: String, index: true, },
}, {
    timestamps: true,
});

donationSchema.index(
    {paymentProvider: 1, paymentIntentId: 1, }, 
    {unique: true, sparse: true}, 
);

donationSchema.pre("validate", function (next){
    if(!this.donor && !this.guestEmail){
        return next(new Error("Donation requires either a donor or guestEmail"));
    }
    next();
});

const Donation = mongoose.models.Donation ||mongoose.model("Donation", donationSchema);
module.exports = {
    Donation,
}