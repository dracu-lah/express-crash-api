import express from "express";
// import path from "path";
const app = express();
const port = process.env.PORT | 8000;
import posts from "./routes/posts.js";
import errorHandler from "./middleware/error.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
// setup static folder
// app.use(express.static(path.join(__dirname, "public")));
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Logger Middleware
app.use(logger);
// Routes
app.use("/api/posts", posts);

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log("Server is running at " + port));
