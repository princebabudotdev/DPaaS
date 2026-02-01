import Imagekit from "imagekit";

import config from "../config/config.js";
import ApiError from "./appError.js";

const imagekit = new Imagekit({
  publicKey: config.publicKey,
  privateKey: config.privateKey,
  urlEndpoint: config.urlEndpoint,
});

const uploadImage = async (file, filename) => {
  try {
    const reponse = await imagekit.upload({
      file: file,
      fileName: filename,
      folder: "DPaaS/",
    });

    return reponse;
  } catch (error) {
    throw new ApiError(500, "Image upload failed");
  }
};

export default uploadImage;
