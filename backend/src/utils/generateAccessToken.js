import config from "../config/config.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRATION } from "../constants/constants.js";

const generateAccessToken = ({ email, userid, username }) => {
    return jwt.sign({id: userid, email, username} , config.JWT_SECRET , {
        expiresIn:ACCESS_TOKEN_EXPIRATION
    })
}

export default generateAccessToken;