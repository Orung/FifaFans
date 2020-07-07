import express from 'express';
import Auth from './../middleware/Auth';
import PersonalMessageController from './../controllers/PersonalMessageController';

const router = express.Router();
router.get('/list-friend-message', Auth, PersonalMessageController.getChats);

export default router;
