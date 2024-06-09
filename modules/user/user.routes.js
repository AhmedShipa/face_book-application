import express from "express";
import {
  getAllUsers,
  getSpecificUser,
  logOut,
  login,
  signUp,
} from "./user.controller.js";
import {
  checkEmailForLogin,
  checkEmailForRegister,
  checkToken,
} from "../../middleware.js";

const userRouter = express.Router();

// get allUsers
userRouter.get("/users", getAllUsers);

// get specific user with specific post and post’s comments.
userRouter.get("/user/:id", getSpecificUser);

// signUp new user
userRouter.post("/users", checkEmailForRegister, signUp);

// login user
userRouter.post("/usersLogin", checkEmailForLogin, login);

// logout
userRouter.post("/usersLogout", checkToken, logOut);
export default userRouter;
