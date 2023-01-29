const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const ErrorHander = require('../utils/errorHander');


// Creation of Post
exports.createPost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        req.body.user = userId;
        const post = await Post.create(req.body);
        const user = await User.findById(userId);
        if (user === null) {
            return next(new ErrorHander('User not found', 400));
        }
        user.posts.push(post._id);
        await user.save();
        return res.send({
            success: true,
            user: user,
            post: post
        });
    } catch (error) {
        next(error);
    }
}

// Get All Posts
exports.getAllPosts = async (req, res) => {
    const posts = await Post.find().sort({ time: -1 });

    res.status(200).json({
        success: true,
        posts
    });
}

// Get Post
exports.getPost = async (req, res, next) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (post === null) {
            return next(new ErrorHander('Post not found', 400));
        }
        return res.send({
            success: true,
            post: post
        });
    } catch (error) {
        next(error);
    }
}

// Edit Post
exports.editPost = async (req, res, next) => {
    const id = req.params.id;
    try {
        let post = await Post.findById(id);
        if (post === null) {
            return next(new ErrorHander('Post not found', 500));
        }
        if (post.user != req.user.id) {
            return next(new ErrorHander(`It's not your post to edit`, 400));
        }
        post = await Post.findByIdAndUpdate(id, req.body, {
            new: true
        });
        return res.status(200).send({
            success: true,
            message: "Post edited successfully",
            post
        });
    } catch (error) {
        next(error);
    }
}


// Edit Post
exports.deletePost = async (req, res, next) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return next(new ErrorHander(`Post not found`, 400));
        }
        if (post.user != req.user.id) {
            return next(new ErrorHander(`It's not your post to delete`, 400));
        }
        const deletedPost = await Post.findByIdAndDelete(id);
        if (deletedPost === null) {
            return next(new ErrorHander('Post not found', 400));
        }
        return res.send({
            success: true,
            message: "Post removed successfully",
            post: deletedPost
        });
    } catch (error) {
        next(error);
    }
}








// Liking a post
exports.addLikeToPost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user.id;
    req.body.user = userId;
    try {
        const post = await Post.findById(postId);
        if (post === null) {
            return next(new ErrorHander('Post not found', 400));
        }
        const user = await User.findById(userId);
        if (user === null) {
            return next(new ErrorHander('User not found', 400));
        }
        if (post.likes.includes(userId)) {
            return next(new ErrorHander('Already Liked', 400));
        }
        user.likes.push(postId);
        await user.save();
        post.likes.push(userId);
        await post.save();
        return res.send({
            success: true,
            post: post,
            user: user
        });
    } catch (error) {
        next(error);
    }
}

exports.removeLikeToPost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user.id;
    req.body.user = userId;
    try {
        const post = await Post.findById(postId);
        if (post === null) {
            return next(new ErrorHander('Post not found', 400));
        }
        const user = await User.findById(userId);
        if (user === null) {
            return next(new ErrorHander('User not found', 400));
        }
        if (!post.likes.includes(userId)) {
            return next(new ErrorHander('Post not Liked', 400));
        }
        post.likes = post.likes.filter(x => !x.equals(userId));

        await post.save();
        return res.send({
            success: true,
            post: post
        });

    } catch (error) {
        next(error);
    }
}





exports.followingFeed = async (req, res, next) => {
    const userId = req.user.id;
    req.body.user = userId;
    try {
        const user = await User.findById(userId);
        if (user === null) {
            return next(new ErrorHander('User not found', 400));
        }
        const follow = user.following;
        var postss = [];
        for (var i = 0; i < follow.length; ++i) {
            const userTempId = follow[i];
            var tempUser = await User.findById(userTempId);
            if (tempUser) {
                if (tempUser.posts) {
                    for (var j = 0; j < tempUser.posts.length; ++j) {
                        const tempPostId = tempUser.posts[j];
                        const tempPost = await Post.findById(tempPostId);
                        if (tempPost) {
                            postss.push(tempPost)
                        }
                    }
                }
            }
        }
        const sortedPosts = postss.sort((a, b) => {
            return new Date(b.time) - new Date(a.time);
        });
        return res.send({
            success: true,
            user: user,
            posts: sortedPosts
        });
    } catch (error) {
        next(error);
    }
}










// comments
exports.createComment = async (req, res, next) => {
    const comment = await Comment.create(req.body);
    const postId = req.params.postId;
    const userId = req.user.id;
    try {
        var post = await Post.findById(postId);
        if (post === null) {
            return next(new ErrorHander('Post not found', 400));
        }
        comment.user = userId;
        await comment.save();
        post.comments.push(comment);
        await post.save();
        return res.send({
            success: true,
            post: post,
            comment: comment
        });
    } catch (error) {
        next(error);
    }

}

exports.removeComment = async (req, res, next) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    try {
        var post = await Post.findById(postId);
        if (post === null) {
            return next(new ErrorHander('Post not found', 400));
        }
        var comment = await Comment.findById(commentId);
        if (comment === null) {
            return next(new ErrorHander('Comment not found', 400));
        }
        if (!post.comments.includes(commentId)) {
            return next(new ErrorHander('No comment', 400));
        }
        if (comment.user != req.user.id && post.user != req.user.id) {
            return next(new ErrorHander(`It's not your comment to delete`, 400));
        }
        post.comments = post.comments.filter(x => !x.equals(commentId));
        await post.save();
        comment = await Comment.findByIdAndDelete(commentId);
        return res.send({
            success: true,
            post: post,
            comment: comment
        });
    } catch (error) {
        next(error);
    }
}

exports.getAllComments = async (req, res) => {
    const comments = await Comment.find().sort({ time: -1 });

    res.status(200).json({
        success: true,
        comments: comments
    });
}