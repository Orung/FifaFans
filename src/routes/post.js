import express from 'express';
import Auth from './../middleware/Auth';
import PostController from './../controllers/PostController';

const router = express.Router();
router.post('/create-post', Auth, PostController.createPost);
router.delete('/delete-post', Auth, PostController.deletePost);
router.put('/comment-post', Auth, PostController.commentOnPost);
router.put('/like-post', Auth, PostController.likePost);
router.get('/list-user-posts', Auth, PostController.listUserPosts);
router.get('/list-posts', Auth, PostController.listPosts);

export default router;
