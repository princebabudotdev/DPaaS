import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    // =====================
    // Core Content
    // =====================
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100, // Prevents spam titles
    },

    content: {
      type: String,
      required: true, // Main post body (text / markdown)
    },

    type: {
      type: String,
      enum: ["QUESTION", "DISCUSSION", "RESOURCE"],
      required: true, // Different rules per post type
    },

    // =====================
    // File attachment (METADATA ONLY)
    // Actual file must be stored in cloud storage
    // =====================
    file: {
      type: String, // stores file URL or storage key
      default: null,
    },

    // =====================
    // Ownership
    // =====================
    authorId: {
      type: String, // ID from auth system
      required: true,
      index: true,
    },

    // =====================
    // Soft Delete (never hard delete posts)
    // =====================
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    // =====================
    // Edit Tracking
    // =====================
    editCount: {
      type: Number,
      default: 0, // Used to limit abuse
    },

    lastEditedAt: {
      type: Date,
      default: null,
    },

    // post visibility

    visibility: {
      type: String,
      enum: ["public", "followers", "private"],
      default: "public",
      index: true,
    },

    // =====================
    // Comments (DERIVED DATA)
    // Actual comments live in Comment collection
    // =====================
    commentsCount: {
      type: Number,
      default: 0,
    },

    lastCommentedAt: {
      type: Date,
      default: null,
    },

    // =====================
    // Moderation Controls
    // =====================
    isLocked: {
      type: Boolean,
      default: false, // Prevent new comments
    },

    isPinned: {
      type: Boolean,
      default: false, // Admin/moderator feature
    },

    // =====================
    // Likes (DERIVED DATA)
    // Source of truth = Like collection
    // =====================
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt & updatedAt
    versionKey: false,
  },
);

// =====================
// Indexes for performance
// =====================
PostSchema.index({ createdAt: -1 });
PostSchema.index({ likesCount: -1 });
PostSchema.index({ commentsCount: -1 });
PostSchema.index({ lastCommentedAt: -1 });
PostSchema.index({ type: 1 });

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
