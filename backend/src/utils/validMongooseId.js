import mongoose from "mongoose";

const validMongooseId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export default validMongooseId;
