import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "./comment.controller.js";
import { checkIdForComment } from "../../middleware.js";
// import { checkIdForComment } from "../../middleware.js";

const commentRouter = express.Router();

// get comments
commentRouter.get("/comments", getAllComments);

// create new comment
commentRouter.post("/comments", createComment);

// updateComment
commentRouter.put("/comments/:id", checkIdForComment, updateComment);

// deleteComment
commentRouter.delete("/comments/:id", checkIdForComment, deleteComment);

export default commentRouter;
