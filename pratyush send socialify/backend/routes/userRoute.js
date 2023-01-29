const express = require('express');
const { getAllUsers, getUser, editUser, deleteUser, createUser, followFunc, unfollowFunc, getFollowers, getFollowing, loginUser, logout, getMe } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.route('/user/new').post(createUser);
router.route('/users').get(getAllUsers);

router.route('/user/login').post(loginUser);
router.route('/user/logout').get(isAuthenticatedUser, logout);
router.route('/user/me').get(isAuthenticatedUser, getMe).post(isAuthenticatedUser, editUser).delete(isAuthenticatedUser, deleteUser);
router.route('/user/:id').get(getUser)
router.route('/user/:id/followers').get(getFollowers);
router.route('/user/:id/following').get(getFollowing);
router.route('/follow/:user2Id').put(isAuthenticatedUser, followFunc).delete(isAuthenticatedUser, unfollowFunc);


module.exports = router;