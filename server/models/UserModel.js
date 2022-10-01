import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        default: null
    },
    profilePhoto: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: "Earth"
    },
    followers: {
        type: Array,
        default: ["63376acae1bc795965d055f4"]
    },
    following: [],
    feeds: [],
    savedFeeds: []
}, { timestamps: true })

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;