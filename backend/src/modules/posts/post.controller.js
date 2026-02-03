import ApiError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import postService from "./post.service.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, type } = req.body;

  const postData = {
    title,
    content,
    file: req.file || null,
    type,
    authorId: req.user.id, // assuming user info is in req.user
  };

  // Simulate post creation logic
  const newpost = await postService.createPostService(postData);
  //   console.log(postData);

  res.status(201).json({
    status: "success",
    data: newpost,
  });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await postService.getAllPostsService();

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

const singlePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;


  if(!postId){
    throw new ApiError(400, "Post ID is required");
  }

  const post = await postService.singlePostService(postId);

  return res.status(200).json({
    status: "success",
    data: post,
  });



})

export default {
  createPost,
  getAllPosts,
  singlePost,
};
