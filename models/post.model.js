import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnection.js";

export const postModel = sequelize.define(
  "post",
  {
    title: {
      type: DataTypes.STRING(100),
    },
    content: {
      type: DataTypes.STRING(100),
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);
