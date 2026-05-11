import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;