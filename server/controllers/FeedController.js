import Feed from "../models/FeedModel.js";
import User from "../models/UserModel.js";

export const feeds_postFeed = async (req, res) => {
    try {
        //insert/update the poster user Id
        const feedObj = await new Feed({ ...req.body, poster: req.decoded.id }).save();
        if (feedObj) {
            //update user feedCount
            const userObj = await User.findByIdAndUpdate(req.decoded.id, { $push: { feeds: feedObj._id } });
            if (userObj) {
                return res.status(201).send({ feedObj: feedObj })
            } else {
                return res.status(500).json({ message: "Internal server error." });
            }
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

//get all user feeds
export const feeds_getAllFeeds = async (req, res) => {
    try {
        const feedObj = await Feed.find().sort({ "createdAt": -1 });
        if (feedObj) {
            return res.status(200).send({ feedObj: feedObj });
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

// like/unlike a feed
export const feeds_likeFeed = async (req, res) => {
    try {
        const feedObj = await Feed.findById(req.params.id);
        if (feedObj) {
            //push only if currentUser is not already liked it
            if (feedObj.likes.includes(req.decoded.id)) {
                //delete the like
                feedObj.likes = feedObj.likes.filter(item => item !== req.decoded.id);
            } else {
                feedObj.likes.push(req.decoded.id);
            }
            feedObj.save();
            return res.status(200).send({ feedObj: feedObj })
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

// comment on feed
export const feeds_commentFeed = async (req, res) => {
    try {
        const commentMessage = req.body.comment;
        const feedObj = await Feed.findByIdAndUpdate(req.params.id, { $push: { comment: { poster: req.decoded.id, username: req.decoded.username, message: commentMessage } } });
        if (feedObj) {
            return res.status(200).send({ message: "Comment successfully!" });
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

//get feed comments
export const feeds_getFeedComment = async (req, res) => {
    try {
        const feedObj = await Feed.findById(req.params.id);
        if (feedObj) {
            return res.status(200).send({ feedObj: feedObj.comment });
        } else {
            return res.status(404).json({ message: "Feed not found." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

//save/unsave feed
export const feeds_saveFeed = async (req, res) => {
    try {
        const userObj = await User.findById(req.decoded.id);
        const feedObj = await Feed.findById(req.params.id);
        if (userObj) {
            //check if post is already saved & update feed's saved Count
            if (userObj.savedFeeds.includes(req.params.id)) {
                userObj.savedFeeds = userObj.savedFeeds.filter(item => item !== req.params.id);
                feedObj.saved = feedObj.saved.filter(item => item !== req.decoded.id);
            } else {
                userObj.savedFeeds.push(req.params.id)
                feedObj.saved.push(req.decoded.id);
            }
            userObj.save();
            feedObj.save();
            return res.status(200).send({ message: "Saved/Unsaved feed successfully." });
        } else {
            return res.status(500).json({ message: "Internal server error." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

//get single feed
export const feeds_getSingleFeed = async (req, res) => {
    try {
        const feedObj = await Feed.findById(req.params.id);
        if (feedObj) {
            return res.status(200).send({ feedObj: feedObj });
        } else {
            return res.status(404).json({ message: "Feed not found." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}