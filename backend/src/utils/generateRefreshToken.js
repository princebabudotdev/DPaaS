import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { REFRESH_TOKEN_EXPIRATION } from '../constants/constants.js';

const genarateRefreshToken = ({email , userid , username}) => {
    return jwt.sign({id:userid , email , username} , config.REfresh_TOKEN_SECRET , {
        expiresIn:REFRESH_TOKEN_EXPIRATION
    });
}

export default genarateRefreshToken;