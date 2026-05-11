import Comment from "../model/comment.js"




export const newComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(200).json({ issuccess: true, message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ issuccess: false, message: 'An error occurred while adding the comment' });
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.query.postId });
        res.status(200).json({ issuccess: true, data: comments });

    }
    catch (error) {
        res.status(500).json({ issuccess: false, message: 'An error occurred while fetching comments' });

    }
}

export const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ issuccess: true, message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ issuccess: false, message: 'Error deleting comment' });
    }
}
