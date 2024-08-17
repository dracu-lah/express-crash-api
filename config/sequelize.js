import { Sequelize } from "sequelize";

// Initialize Sequelize with PostgreSQL connection details
const sequelize = new Sequelize(
  "postgres://postgres:pass@localhost:5432/posts_node",
); // Example for postgres

export default sequelize;
