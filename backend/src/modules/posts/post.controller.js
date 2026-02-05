import ApiError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validMongooseId from "../../utils/validMongooseId.js";
import authService from "../auth/auth.service.js";
import postService from "./post.service.js";

// create post controller
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

// get all posts controller
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await postService.getAllPostsService();

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

// single post controller
const singlePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }

  const validId = validMongooseId(postId);

  if (!validId) {
    throw new ApiError(400, "Invalid Post ID");
  }

  const post = await postService.singlePostService(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res.status(200).json({
    status: "success",
    data: post,
  });
});

// update post controller

const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { title, content, type } = req.body;
  const userId = req.user.id;

  if (!req.user || !req.user.id) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }

  if (!validMongooseId(postId)) {
    throw new ApiError(400, "Invalid Post ID");
  }

  if (!validMongooseId(userId)) {
    throw new ApiError(400, "Invalid User ID");
  }

  const post = await postService.updatePostService(
    postId,
    { title, content, type },
    userId,
  );

  res.status(200).json({
    status: "success",
    data: post,
  });
});

// delete post controller (optional)

const deletePost = asyncHandler(async (req, res) => {
  // Implementation for deleting a post (soft delete)
  const { postId } = req.params;
  const userId = req.user.id;

  if (!req.user || !req.user.id) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }

  if (!validMongooseId(postId)) {
    throw new ApiError(400, "Invalid Post ID");
  }

  await postService.deletePostService(postId, userId);

  res.status(200).json({
    status: "success",
    message: "Post deleted successfully",
  });
});

// post visibility controller

const postVisibility = asyncHandler(async (req, res) => {
  const { visibility } = req.body;
  const { postId } = req.params;

  const userId = req.user.id;


  if(!req.user || !req.user.id){
    throw new ApiError(401, "Unauthorized");
  }

  if (!postId) {
    throw new ApiError(404, "Post not found");
  }

  if (!validMongooseId(postId)) {
    throw new ApiError(400, "postId is invalid");
  }

  const updatedpost = await postService.postVisibilityService(
    postId,
    userId,
    visibility,
  );

  return res.status(200).json({
    status: "success",
    data: updatedpost,
  });
});

export default {
  createPost,
  getAllPosts,
  singlePost,
  updatePost,
  deletePost,
  postVisibility,
};
