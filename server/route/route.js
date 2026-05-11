import express from 'express';
import { signupUser, loginUser } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost, getAllPosts, getPost, updatePost, deletePost } from '../controller/post-controllers.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js';
import { newComment, getAllComments, deleteComment } from '../controller/comment-controller.js';

const router = express.Router();

// Public
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/file/:filename', getImage);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPost);
router.get('/comments', getAllComments);

// Protected
router.post('/file/upload', authenticateToken, upload.single('file'), uploadImage);
router.post('/posts/create', authenticateToken, createPost);
router.put('/posts/:id', authenticateToken, updatePost);
router.delete('/posts/:id', authenticateToken, deletePost);
router.post('/comments/new', authenticateToken, newComment);
router.delete('/comments/:id', authenticateToken, deleteComment);

export default router;