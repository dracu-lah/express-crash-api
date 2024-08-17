import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Post;
