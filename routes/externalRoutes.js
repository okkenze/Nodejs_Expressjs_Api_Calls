const express = require("express");
const {
  getPosts,
  getPostsById,
  postData,
} = require("../controllers/postController");

const router = express.Router();

//GET all posts
router.get("/", getPosts);

//Get a single post
router.get("/:id", getPostsById);

//Post data
router.post("/", postData);

module.exports = router;
