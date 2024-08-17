// models/Post.js

import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize"; // Ensure this path is correct

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the Post model
export default Post;
