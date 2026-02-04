import PostModel from "./post.model.js";

const createPostDao = async (postData) => {
  return await PostModel.create(postData);
};

const getAllPostsDao = async () => {
  return await PostModel.find({ isDeleted: false })
  .sort({ createdAt: -1, _id: -1 })
  .limit(5); // limit to 100 posts
}

const findByIdDao = async (postId) => {
  return await PostModel.findById(postId);
}

const findOneDao = async (postId) => {
  return await PostModel.findOne({
    _id:postId,
    isDeleted: false,
  });
}

export default {
  createPostDao,
  getAllPostsDao,
  findByIdDao,
  findOneDao,
};
