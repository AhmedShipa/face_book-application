import { actualToken, token, tokenRead } from "../../middleware.js";
import { commentModel } from "../../models/comment.model.js";
import { postModel } from "../../models/post.model.js";
import { userModel } from "../../models/user.model.js";

// get all users
const getAllUsers = async (req, res) => {
  const users = await userModel.findAll();
  res.json(users);
};

// get specific user with specific post and post’s comments.
const getSpecificUser = async (req, res) => {
  const users = await userModel.findOne({
    include: [postModel, commentModel],
    where: {
      id: req.params.id,
    },
  });
  if (users) {
    res.json(users);
  } else {
    res.json({ message: "user not found" });
  }
};

// signUp new user
const signUp = async (req, res) => {
  // start of the code in the middleware.js

  await userModel.create(req.body);
  res.status(201).json({ message: "user added successfully" });
};

// login
const login = async (req, res) => {
  // start of the code in the middleware.js
  res
    .status(200)
    .json({ message: `user exist...your token is ${actualToken}` });
};

// logOut
const logOut = async (req, res) => {
  res.json({ message: "logout successfully ..please login" });
};
export { getAllUsers, signUp, login, logOut, getSpecificUser };
