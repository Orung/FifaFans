import express from 'express';
import UserController from './../controllers/UserController';
import FriendController from './../controllers/FriendController';
import Auth from './../middleware/Auth';

const router = express.Router();

router.get('/search-user', UserController.searchUsers);
router.get('/view-user-details', Auth, UserController.viewUserDetails);
router.post('/add-follow-users', Auth, FriendController.addFriend);

export default router;