const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body: {
        text: {
            type: String,
            required: [true, "Post body cannot be empty"],
            maxlength: [256, "Cannot Post more than 256 characters"]
        },
        images: [
            {
                public_id: {
                    type: String,
                   // required: true
                },
                url: {
                    type: String,
                  //  required: true
                }
            }
        ]
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);