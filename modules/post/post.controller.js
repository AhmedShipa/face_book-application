import { postModel } from "../../models/post.model.js";
import { userModel } from "../../models/user.model.js";

// get all users + check on isDeleted
const getAllPosts = async (req, res) => {
  const posts = await postModel.findAll({
    include: userModel,
    where: {
      isDeleted: false,
    },
  });
  res.json(posts);
};

// get all users + check on isDeleted
const getSpecificPost = async (req, res) => {
  const posts = await postModel.findOne({
    include: userModel,
    where: {
      isDeleted: false,
      id: req.params.id,
    },
  });
  if (posts) {
    res.json(posts);
  } else {
    res.json({ message: "post is not found" });
  }
};

// create new post
const createPost = async (req, res) => {
  let user_id = await userModel.findOne({
    attributes: ["id"],
    where: {
      id: req.body.author,
    },
  });
  if (!user_id) {
    res.status(404).json({ message: "userId is not found" });
  } else {
    await postModel.create(req.body);
    res.status(201).json({ message: "post added successfully" });
  }
};

// updatePost
const updatePost = async (req, res) => {
  await postModel.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "post updated successfully" });
};

// delete post (isDeleted)
const deletePost = async (req, res) => {
  await postModel.update(
    {
      isDeleted: true,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json({ message: "post deleted successfully" });
};

export { getAllPosts, createPost, updatePost, deletePost, getSpecificPost };
