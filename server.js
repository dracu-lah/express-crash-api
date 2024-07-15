import express from "express";
// import path from "path";
const app = express();
const port = process.env.PORT | 8000;
import posts from "./routes/posts.js";
// setup static folder
// app.use(express.static(path.join(__dirname, "public")));
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// api routes
app.use("/api/posts", posts);

app.get("/test", (req, res) => res.json({ message: "Test is working" }));
app.listen(port, () => console.log("Server is running at " + port));
