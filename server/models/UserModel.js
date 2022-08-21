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
    followers: [],
    following: [],
    feeds: []
}, { timestamps: true })

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;