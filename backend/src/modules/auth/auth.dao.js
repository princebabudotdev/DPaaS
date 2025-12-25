import User from "./user.model.js";

 const createUser = async (userdata) => {
    return await User.create(userdata);
}

const findByEmail = async (email) =>{
    return await User.findOne({email});
}


export default  {
    createUser,
    findByEmail
}