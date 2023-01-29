const express = require('express');
const { getAllPosts, createPost, editPost, deletePost, getPost, addLikeToPost, removeLikeToPost, followingFeed, createComment, removeComment, getAllComments } = require('../controllers/postController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();


router.route('/post/create').post(isAuthenticatedUser, createPost);
router.route('/posts').get(getAllPosts);
router.route('/post/:id').get(getPost).post(isAuthenticatedUser, editPost).delete(isAuthenticatedUser, deletePost);
router.route('/posts/:postId/likes').put(isAuthenticatedUser, addLikeToPost).delete(isAuthenticatedUser, removeLikeToPost);
router.route('/posts/feed').get(isAuthenticatedUser, followingFeed);
router.route('/posts/:postId/comments').post(isAuthenticatedUser, createComment);
router.route('/posts/:postId/comments/:commentId').delete(isAuthenticatedUser, removeComment);
router.route('/posts/:postId/comments').get(getAllComments);


module.exports = router