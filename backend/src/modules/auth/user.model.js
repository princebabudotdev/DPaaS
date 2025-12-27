import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: function () {
      return !this.githubId && !this.googleId;
    },
    unique: true,
    trim: true,
    select: true,
  },
  username: {
    type: String,
    required: function () {
      return !this.googleId && !this.githubId;
    },
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: function () {
      if(!this.isNew) return false
      return !this.googleId && !this.githubId ;
    }, // not required if using google auth
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  profileViews: {
    type: Number,
    default: 0,
  },
  SocialLinks: [
   {
    tittle:{
      type:String
    },
    url:{
      type:String,
    }
   }
  ],
  skills:{
    type:[String],
    default:[]
  },
  location: {
    type: String,
    default: null,
  },
  resetPasswordOTP: {
    type: String,
  },
  resetPasswordOTPExpiry: {
    type: Date,
  },
  resetPasswordOTPSentAt:{
    type:Date
  },
  resetPasswordOTPAttempt:{
    type:Number,
    default:0
  }
});

userSchema.pre("save", async function () {
  if (!this.password) return;
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
