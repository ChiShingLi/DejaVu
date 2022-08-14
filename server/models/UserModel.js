import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
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
        default: null
    },
    followers: [],
    following: [],
    feeds: []
}, { timestamps: true })

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;