const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};
module.exports.setPosts = async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ message: "message is required" });
  }
  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  });

  res.status(200).json(post);
};

module.exports.editPost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
    new: true,
  });
  res.status(200).json(updatePost);
};

module.exports.deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  const deletePost = await PostModel.findByIdAndDelete(post);
  res.status(200).json(deletePost);
};

module.exports.likePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    post.likers.push(req.body.userId);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

module.exports.dislikePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};
