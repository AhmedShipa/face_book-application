import { commentModel } from "./models/comment.model.js";
import { postModel } from "./models/post.model.js";
import { userModel } from "./models/user.model.js";
import bcrypt from "bcrypt";

// check if email is unique for register
const checkEmailForRegister = async (req, res, next) => {
  // check if email is unique
  const user = await userModel.findOne({
    attributes: ["email"],
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    req.body.password = bcrypt.hashSync(String(req.body.password), 8);
    next();
  } else {
    res.status(209).json({ message: "email exists" });
  }
};

// check if email is unique for login
let token;
let tokenRead;
let actualToken;
const checkEmailForLogin = async (req, res, next) => {
  // check if email is unique
  const user = await userModel.findOne({
    attributes: ["id", "email", "password"],
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(404).json({ message: "user not exist please register" });
  } else {
    let match = bcrypt.compareSync(String(req.body.password), user.password);
    if (match) {
      token = await userModel.update(
        {
          token: user.id,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      tokenRead = await userModel.findOne({
        attributes: ["token"],

        where: {
          id: user.id,
        },
      });
      actualToken = tokenRead.token;
      next();
    } else {
      res.json({ message: "password is not correct" });
    }
  }
};

// remove token for logOut
const checkToken = async (req, res, next) => {
  const user = await userModel.findOne({
    attributes: ["email"],
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.json({ message: "failed to logout" });
  } else {
    await userModel.update(
      {
        token: null,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );
    next();
  }
};

// check for id post
const checkIdForPost = async (req, res, next) => {
  let post = await postModel.findOne({
    attributes: ["id", "isDeleted"],
    where: {
      id: req.params.id,
    },
  });
  // check on isDeleted
  if (!post || post.isDeleted == true) {
    res.status(404).json({ message: "post not found" });
  } else {
    let user = await userModel.findOne(
      {
        attributes: ["token"],
      },
      {
        where: {
          token: req.params.id,
        },
      }
    );
    if (user) {
      next();
    } else {
      res.json({ message: "user is not the owner of this post" });
    }
  }
};

// check for id comment
const checkIdForComment = async (req, res, next) => {
  let comment = await commentModel.findOne({
    attributes: ["id"],
    where: {
      id: req.params.id,
    },
  });
  if (!comment) {
    res.status(404).json({ message: "comment not found" });
  } else {
    next();
  }
};

export {
  checkEmailForRegister,
  checkEmailForLogin,
  token,
  tokenRead,
  actualToken,
  checkToken,
  checkIdForPost,
  checkIdForComment,
};
