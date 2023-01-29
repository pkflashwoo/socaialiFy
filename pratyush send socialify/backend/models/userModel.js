const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: [20, "Name can't be more than 20 characters"],
        minlength: [4, "user_id must be more than 4 characters"]
    },
    user_id: {
        type: String,
        required: true,
        unique: true,
        maxlength: [15, "user_id can't be more than 20 characters"],
        minlength: [4, "user_id must be more than 4 characters"]
    },
    user_pfp: {
        public_id: {
            type: String,
          //  required: true
        },
        url: {
            type: String,
           // required: true
        }
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "Password must be longer than 6 characters"],
        select: false
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    user_bio: {
        type: String,
        maxlength: [128, 'description limited exceeded']
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

// Password hashing
UserProfileSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// JWT Token
UserProfileSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// Compare password
UserProfileSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserProfileSchema);
