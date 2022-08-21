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