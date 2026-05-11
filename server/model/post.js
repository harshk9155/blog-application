import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: false },
    username: { type: String, required: true },
    categories: { type: String, required: false },
    createdDate: { type: Date, default: Date.now }
});

const postModel = mongoose.model('post', postSchema);
export default postModel;
