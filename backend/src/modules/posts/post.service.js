import ApiError from "../../utils/appError.js";
import postDao from "./post.dao.js";
import uploadImage from "../../utils/imageKit.js";
import { v4 } from "uuid";

const createPostService = async (postdata) => {
  if (!postdata) {
    throw new ApiError(400, "Post data is required");
  }

  let result = null;

  if (postdata.file) {
    result = await uploadImage(postdata.file?.buffer, `${v4()}`);
  }
  return postDao.createPostDao({
    title: postdata.title,
    content: postdata.content,
    type: postdata.type,
    file: result?.url || null,
    authorId: postdata.authorId,
  });
};

const getAllPostsService = async () => {
  return postDao.getAllPostsDao();
};

const singlePostService = async (postId) => {
  const post = await postDao.findByIdDao(postId);
  if (!post || post.isDeleted) {
    throw new ApiError(404, "Post not found");
  }
  return post;
};

const updatePostService = async (postId, { title, content, type }, userId) => {
  const post = await postDao.findByIdDao(postId);

  if (!post || post.isDeleted) {
    throw new ApiError(404, "Post not found");
  }

  if (post.authorId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this post");
  }

  if (type && !["QUESTION", "DISCUSSION", "RESOURCE"].includes(type)) {
    throw new ApiError(400, "Invalid post type");
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.type = type || post.type;
  post.updatedAt = new Date();

  await post.save();
  return post;
};

const deletePostService = async (postId, userId) => {
  const post = await postDao.findOneDao(postId);

  if (!post || post.isDeleted) {
    throw new ApiError(404, "Post not found");
  }

  if (post.authorId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  post.isDeleted = true;
  post.deletedAt = new Date();

  await post.save();
  return;
};

const postVisibilityService = async (postId, userId, visibility) => {
  const post = await postDao.findOneDao(postId);

  console.log(postId);

  if (!post || post.isDeleted) {
    throw new ApiError(404, "Post not found");
  }

  if (post.authorId.toString() !== userId.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to change visibility of this post",
    );
  }

  // logic to change visibility

  post.visibility = visibility || post.visibility;

  await post.save();

  return post;
};

export default {
  createPostService,
  getAllPostsService,
  singlePostService,
  updatePostService,
  deletePostService,
  postVisibilityService,
};
