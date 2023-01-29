const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Comment body cannot be empty"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Comment', commentSchema);