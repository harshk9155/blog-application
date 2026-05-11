import express from 'express';
import { signupUser, loginUser } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost, getAllPosts, getPost, updatePost,deletePost } from '../controller/post-controllers.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js';
import { newComment,getAllComments, deleteComment } from '../controller/comment-controller.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/file/upload',upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.post('/posts/create', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.post('/comments/new', newComment);
router.get('/comments', getAllComments);
router.delete('/comments/:id', deleteComment);

export default router;