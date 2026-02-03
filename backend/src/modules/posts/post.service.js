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
}

const singlePostService = async (postId) => {
  const post = await postDao.findByIdDao(postId);
  if (!post || post.isDeleted) {
    throw new ApiError(404, "Post not found");
  }
  return post;
}

export default {
  createPostService,
  getAllPostsService,
  singlePostService
};
