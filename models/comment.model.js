import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnection.js";

export const commentModel = sequelize.define(
  "comment",
  {
    content: {
      type: DataTypes.STRING(100),
    },
  },
  { timestamps: false }
);
