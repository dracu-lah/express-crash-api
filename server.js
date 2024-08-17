import express from "express";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
// Get the __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
const filePath = path.join(__dirname, "./swagger-output.json");
const swaggerDocument = JSON.parse(await readFile(filePath, "utf8"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import posts from "./routes/posts.js";
import errorHandler from "./middleware/error.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import sequelize from "./config/sequelize.js";

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
// Setup static folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// Routes
app.use("/api/posts", posts);
app.use("/api/auth", posts);

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server is running at port ${port}`));
