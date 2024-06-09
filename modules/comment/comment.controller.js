import { commentModel } from "../../models/comment.model.js";
import { postModel } from "../../models/post.model.js";
import { userModel } from "../../models/user.model.js";

// get all users
const getAllComments = async (req, res) => {
  const comments = await commentModel.findAll({
    include: [userModel, postModel],
  });
  res.json(comments);
};

// create new comment
const createComment = async (req, res) => {
  let user_id = await userModel.findOne({
    attributes: ["id"],
    where: {
      id: req.body.userId,
    },
  });
  let post_id = await postModel.findOne({
    attributes: ["id"],
    where: {
      id: req.body.postId,
    },
  });

  if (!user_id && !post_id) {
    res.status(201).json({ message: "comment added successfully" });
  } else if (!user_id) {
    res.status(404).json({ message: "userId is not found" });
  } else if (!post_id) {
    res.status(404).json({ message: "postId is not found" });
  } else {
    await commentModel.create(req.body);
    res.status(201).json({ message: "comment added successfully" });
  }
};

// updateComment
const updateComment = async (req, res) => {
  await commentModel.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "comment updated successfully" });
};

// delete comment
const deleteComment = async (req, res) => {
  await commentModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "comment deleted successfully" });
};

export { getAllComments, createComment, updateComment, deleteComment };
