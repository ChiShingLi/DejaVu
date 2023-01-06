import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const users_registerUser = async (req, res) => {
    try {
        //check for duplicated username
        const isDuplicate = await User.findOne({ username: req.body.username })
        if (isDuplicate) {
            return res.status(409).send({ message: "User already exists." })
        }

        //else, register new user
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const userObj = await new User({ ...req.body, password: hashedPassword }).save();

        //remove password property from userObj before signing with JWT
        const { password, ...reducedUserObj } = userObj._doc;

        //sign the token & return back the signed token
        const token = jwt.sign({ id: userObj._id, username: userObj.username }, process.env.JWT_SECRET);
        return res.status(201).json({ token: token, userDetails: reducedUserObj });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const users_userlogin = async (req, res) => {
    try {
        const reqObj = req.body;
        //check if user exists
        const userObj = await User.findOne({ username: reqObj.username });
        if (userObj) {
            //validate password with the hashed password
            const passwordValid = await bcrypt.compare(reqObj.password, userObj.password);
            if (passwordValid) {

                //remove password property from userObj before signing with JWT
                const { password, ...reducedUserObj } = userObj._doc;

                //valid login
                const token = jwt.sign({ id: userObj._id, username: userObj.username }, process.env.JWT_SECRET);
                return res.status(200).send({ token: token, userDetails: reducedUserObj });
            } else {
                return res.status(401).send({ message: "Incorrect username or password." })
            }
        } else {
            return res.status(401).send({ message: "Incorrect username or password." })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const users_updateUserCard = async (req, res) => {
    try {
        const { fullName, title, location, profilePhoto, description } = req.body;
        const userObj = await User.findOneAndUpdate({ username: req.decoded.username }, { $set: { fullName: fullName, title: title, location: location, profilePhoto: profilePhoto, description: description } });
        if (userObj) {
            //remove password property before sending back userObj data
            // const { password, ...reducedUserObj } = userObj._doc;

            return res.status(200).send({ message: "Updated user card successfully!" });
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const users_getCurrentUserDetails = async (req, res) => {
    try {
        const userObj = await User.findOne({ username: req.decoded.username });
        if (userObj) {
            //remove password property before sending back userObj data
            const { password, ...reducedUserObj } = userObj._doc;
            //found
            return res.status(200).send({ userDetails: reducedUserObj });
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const users_getFeedUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const userObj = await User.findById(userId);
        if (userObj) {
            const { username, fullName, profilePhoto } = userObj._doc;

            //extract userDetails
            const reducedUserObj = {
                username: username,
                fullName: fullName,
                profilePhoto: profilePhoto
            }

            return res.status(200).send({ userDetails: reducedUserObj });
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const users_followUser = async (req, res) => {
    try {
        const userId = req.decoded.id;
        const otherUserId = req.params.id;
        const userObj = await User.findById(userId);
        const otherUserObj = await User.findById(otherUserId);

        //if both users are valid
        if (userObj && otherUserObj) {

            //check if already follow, unfollow
            if (userObj.following.includes(otherUserId)) {
                userObj.following = userObj.following.filter(item => item !== otherUserId);
                otherUserObj.followers = otherUserObj.followers.filter(item => item !== userId);
            } else {
                //if not following, follow them
                userObj.following.push(otherUserId);
                otherUserObj.followers.push(userId);
            }
            userObj.save();
            otherUserObj.save();
            return res.status(200).send({ message: "Follow/unfollow user successfully." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const users_getUserProfile = async (req, res) => {
    try {
        const username = req.params.username;
        const userObj = await User.findOne({ username: username });
        if (userObj) {
            //remove user password before returning
            const { password, ...reducedUserObj } = userObj._doc;
            return res.status(200).send({ userDetails: reducedUserObj });
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const users_changePassword = async (req, res) => {
    try {
        const userId = req.decoded.id
        const userObj = await User.findById(userId);
        if (userObj) {
            const passwordObj = req.body;
            //compare user input with the current hashed password
            const isValidPassword = await bcrypt.compare(passwordObj.currentPassword, userObj.password);

            if (isValidPassword) {
                //change current password to new password
                const salt = await bcrypt.genSalt();
                const newHashedPassword = await bcrypt.hash(passwordObj.newPassword, salt);
                await User.findByIdAndUpdate(req.decoded.id, { $set: { password: newHashedPassword } });
                return res.status(200).send({ message: "Password updated successfully." })
            } else {
                return res.status(401).send({ message: "Incorrect password." })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}