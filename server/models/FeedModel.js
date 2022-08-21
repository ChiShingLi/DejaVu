import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
    poster: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    photo: {
        type: String,
        default: null
    },
    desc: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true
    },
    location: {
        type: String,
        default: null
    },
    likes: [],
    shares: [],
    comment: [],
    saved: []
}, { timestamps: true });

const FeedModel = mongoose.model("Feeds", FeedSchema);

export default FeedModel;