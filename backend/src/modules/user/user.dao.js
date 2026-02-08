import User from "../auth/user.model.js"


const findById = async (userId) => {
    return await User.findById(userId);
}

const findOne = async ({username}) => {
    return await User.findOne({username})
}


export default {
    findById,
    findOne
}