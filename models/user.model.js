import { postModel } from "./post.model.js";
import { commentModel } from "./comment.model.js";
import sequelize from "../database/dbConnection.js";
import { DataTypes } from "sequelize";
export const userModel = sequelize.define(
  "user",
  {
    userName: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    password: {
      type: DataTypes.STRING(100),
    },
    token: {
      type: DataTypes.INTEGER(100),
    },
  },
  { timestamps: false }
);
userModel.hasMany(postModel, {
  foreignKey: "author",
});
userModel.hasMany(commentModel);
postModel.belongsTo(userModel, {
  foreignKey: "author",
});
postModel.hasMany(commentModel);
commentModel.belongsTo(postModel);
commentModel.belongsTo(userModel);
