import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const users_registerUser = async (req, res) => {
    try {
        const { username, password, fullName } = req.body;

        //check for duplicated username
        const isDuplicate = await User.findOne({ username: username })
        if (isDuplicate) {
            return res.status(409).send({ message: "User already exists." })
        }

        //else, register new user
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await new User({ ...req.body, password: hashedPassword }).save();

        //sign the token & return back the signed token
        const token = jwt.sign({ username: username, fullName: fullName }, process.env.JWT_SECRET);
        return res.status(201).json({ token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const users_userlogin = async (req, res) => {
    try {
        const reqObj = req.body;
        //check if user exists
        const user = await User.findOne({ username: reqObj.username });
        if (user) {
            //validate password with the hashed password
            const passwordValid = await bcrypt.compare(reqObj.password, user.password);
            if (passwordValid) {
                //valid login
                const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
                return res.status(200).send({ token: token });
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