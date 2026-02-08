import asyncHandler from '../../utils/asyncHandler.js'
import ApiError from '../../utils/appError.js'
import userService from './user.service.js';

const updateProfile = asyncHandler(async (req , res) => {
    const {fullname , username , location , gender , bio} = req.body

    if(!req.user || !req.user.id){
        throw new ApiError(401 , "Unauthorized");
    }

    const userId = req.user?.id || null

    const user = await userService.updateProfileService({fullname , username , location , gender , bio} , userId);

    if(!user){
        throw new ApiError(404 , "User not found");
    }

    return res.status(200).json({
        sucess:true,
        message:"User updated sucessfully",
        user
    })



})


export default {
    updateProfile
}