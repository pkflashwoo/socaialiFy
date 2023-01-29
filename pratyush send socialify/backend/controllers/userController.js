const User = require('../models/userModel');
const Post = require('../models/postModel');
const ErrorHander = require('../utils/errorHander');
const sendToken = require('../utils/jwtToken');


// Creation of User
exports.createUser = async (req, res, next) => {
    try {
        // Checking if User_id is available
        const userWithSameId = await User.findOne({ user_id: req.body.user_id });
        if (userWithSameId) {
            return next(new ErrorHander('A user with the same user_id already exists', 404));
        }
        // User created
        const user = await User.create(req.body);
        if (user === null) {
            return next(new ErrorHander('User not created', 404));
        }
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
}

// Get All Users
exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
}

// Get User
exports.getUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user === null) {
            return next(new ErrorHander('User not found', 404));
        }
        return res.send({
            success: true,
            user: user
        });
    } catch (error) {
        next(error);
    }
}






// Login Users
exports.loginUser = async (req, res, next) => {
    const { user_id, password } = req.body;
    try {
        if (!user_id) {
            return next(new ErrorHander('Please enter User_id', 400));
        }
        if (!password) {
            return next(new ErrorHander('Please enter Password', 400));
        }
        const user = await User.findOne({ user_id }).select("+password")
        if (!user) {
            return next(new ErrorHander('Invalid User_id', 401));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHander('Wrong password', 401));
        }

        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
}

// Logout user
exports.logout = async (req, res, next) => {

    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        console.log('logged out');
        res.status(200).json({
            success: true,
            message: "Logged Out"
        })
    } catch (error) {
        next(error);
    }
}


// get personal details
exports.getMe = async (req, res, next) => {
    // console.log("HELLO");
    const id = req.user.id;
    // console.log(req.user.id);
    try {
        const user = await User.findById(id);
        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
    // res.status(200).json({
    //     success: true,
    //     message: "Logged Out"
    // })
}

// Edit User
exports.editUser = async (req, res, next) => {
    const id = req.user.id;
    try {
        let user = await User.findById(id);
        user = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        return res.status(200).send({
            success: true,
            message: "User edited successfully",
            user: user
        });
    } catch (error) {
        next(error);
    }
}


// Delete User
exports.deleteUser = async (req, res, next) => {
    const id = req.user.id;
    try {
        const deletedUser = await User.findById(id);
        if (deletedUser === null) {
            return next(new ErrorHander('User not found', 400));
        }
        let posts = deletedUser.posts;
        for (let i = 0; i < posts.length; ++i) {
            let post = await Post.findById(posts[i]);
            if (post) {
                await Post.findByIdAndDelete(posts[i]);
            }
        }
        let likes = deletedUser.likes;
        for (let i = 0; i < likes.length; ++i) {
            let likedPost = await Post.findById(likes[i]);
            likedPost.likes = likedPost.likes.filter(x => !x.equals(id));
            await likedPost.save();
        }
        let followers = deletedUser.followers;
        for (let i = 0; i < followers.length; ++i) {
            let follower = await User.findById(followers[i]);
            follower.following = follower.following.filter(x => !x.equals(id));
            await follower.save();
        }
        let followings = deletedUser.following;
        for (let i = 0; i < followings.length; ++i) {
            let following = await User.findById(followings[i]);
            following.followers = following.followers.filter(x => !x.equals(id));
            await following.save();
        }
        await User.findByIdAndDelete(id);
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        return res.send({
            success: true,
            message: "User removed successfully",
            user: deletedUser
        });
    } catch (error) {
        next(error);
    }
}








// follow somebody
exports.followFunc = async (req, res, next) => {
    const user1Id = req.user.id;
    req.body.user = user1Id;
    const user2Id = req.params.user2Id;
    try {
        const user1 = await User.findById(user1Id);
        const user2 = await User.findById(user2Id);
        if (user1 === null || user2 === null) {
            return next(new ErrorHander('User not found', 400));
        }
        if (user1.following.includes(user2Id) || user2.followers.includes(user1Id)) {
            return next(new ErrorHander('Already following', 400));
        }
        user1.following.push(user2Id);
        user2.followers.push(user1Id);
        await user1.save();
        await user2.save();
        return res.send({
            success: true
        });
    } catch (error) {
        next(error);
    }
}

// unfollow somebody
exports.unfollowFunc = async (req, res, next) => {
    try {
        const user1Id = req.user.id;
        req.body.user = user1Id;
        const user2Id = req.params.user2Id;
        const user1 = await User.findById(user1Id);
        const user2 = await User.findById(user2Id);
        if (user1 === null || user2 === null) {
            return next(new ErrorHander('User not found', 400));
        }
        if (!user1.following.includes(user2Id) || !user2.followers.includes(user1Id)) {
            return next(new ErrorHander('Not following', 400));
        }
        user1.following = user1.following.filter(x => !x.equals(user2Id));
        await user1.save();
        user2.followers = user2.followers.filter(x => !x.equals(user1Id));
        await user2.save();
        return res.send({
            success: true,
            user1: user1,
            user2: user2
        });
    } catch (error) {
        next(error);
    }
}





// GET FOLLOWERS
exports.getFollowers = async (req, res, next) => {
    // const userId = req.user.id;
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user === null) {
            return next(new ErrorHander('No followers yet!', 400));
        }
        var followers = [];
        for (var i = 0; i < user.followers.length; ++i) {
            const tempUser = await User.findById(user.followers[i]);
            if (tempUser) {
                followers.push(tempUser);
            }
        }
        return res.send({
            success: true,
            user: user,
            followers: followers
        });
    } catch (error) {
        next(error);
    }
}

// GET FOLLOWING
exports.getFollowing = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user === null) {
            return next(new ErrorHander('No following yet!', 400));
        }
        var following = [];
        for (var i = 0; i < user.following.length; ++i) {
            const tempUser = await User.findById(user.following[i]);
            if (tempUser) {
                following.push(tempUser);
            }
        }
        return res.send({
            success: true,
            user: user,
            following: following
        });
    } catch (error) {
        next(error);
    }
}