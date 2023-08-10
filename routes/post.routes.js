const express = require("express");
const {
  setPosts,
  getPosts,
  editPost,
  likePost,
  dislikePost,
} = require("../controllers/post.constroller");
const router = express.Router();
router.get("/", getPosts);
router.post("/", setPosts);

router.put("/:id", editPost);

router.delete("/:id", (req, res) => {
  res.json({ message: "post supprimé" + req.params.id });
});

router.patch("/like-post/:id", likePost);

router.patch("/dislike-post/:id", dislikePost);
module.exports = router;
