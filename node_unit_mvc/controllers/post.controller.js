const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    const postId = req.body.id;
    const updatedPost = req.body;

    return PostModel.updatePost(postId, updatedPost, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    });

};

PostController.findPost = (req, res) => {
    const postId = req.body.id;
    PostModel.findPost(postId, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })
};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;