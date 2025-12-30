import axios from "axios";
import { instance } from "../config/AxiosConfig";

const LoginWithGoogle = async () => {
  try {
    window.location.href = "http://localhost:3000/api/auth/google";
    // console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const LoginWithGithub = async () => {
  try {
    window.location.href = "http://localhost:3000/api/auth/github";

    // console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const LoginWithEmailAndPassword = async (data) => {
  return await instance.post("/api/auth/login", data);
};

const SignUpWithEmailAndPassword = async (data) =>
  await instance.post("/api/auth/register", data);

export default {
  LoginWithGoogle,
  LoginWithGithub,
  LoginWithEmailAndPassword,
  SignUpWithEmailAndPassword,
};
