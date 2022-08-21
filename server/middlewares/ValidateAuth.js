import jwt from "jsonwebtoken";

//verify if the token is valid
const isValidAuth = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true
    } catch (error) {
        return false;
    }
}

export const validateAuth = (req, res, next) => {
    try {
        const token = req.header("authorization").split(" ")[1];
        const isValid = isValidAuth(token);
        if (isValid) {
            //store decoded data in request
            req.decoded = jwt.decode(token, process.env.JWT_SECRET);
            //valid token
            next();
            return;
        } else {
            //invalid token
            return res.status(401).send({ message: "Unauthorized Token." });
        }
    } catch (error) {
        return res.status(500).send({ message: "Internal Authentication Server Error." });
    }
}