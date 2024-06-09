import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSpecificPost,
  updatePost,
} from "./post.controller.js";
import { checkIdForPost } from "../../middleware.js";

const postRouter = express.Router();

// get posts
postRouter.get("/posts", getAllPosts);

// Get a specific post with the author.
postRouter.get("/post/:id", getSpecificPost);

// create new post
postRouter.post("/posts", createPost);

// updatePost
postRouter.put("/posts/:id", checkIdForPost, updatePost);

// updatePost
postRouter.delete("/posts/:id", checkIdForPost, deletePost);

export default postRouter;
