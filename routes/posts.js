import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post One" },
  { id: 3, title: "Post One" },
  { id: 4, title: "Post One" },
];

// Get all posts
router.get("/", (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// Get single post
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  let post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`A post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  return res.status(200).json(post);
});

// Create a new post
router.post("/", (req, res, next) => {
  const title = req.body.title;
  if (!title) {
    const error = new Error(`Please Include Title`);
    error.status = 404;
    return next(error);
  }
  posts.push({ id: posts.length + 1, title });
  res.status(201).json(posts);
});

// Update Existing post
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  let post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`A post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  res.status(200).json(posts);
});

// Delete post
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  let post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`A post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router;
