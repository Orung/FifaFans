import express from 'express';
import Auth from './../middleware/Auth';
import RoomController from './../controllers/RoomController';

const router = express.Router();
router.post('/create-room', Auth, RoomController.createRoom);
router.get('/list-rooms', Auth, RoomController.getListOfGroups);
router.get('/list-user-rooms', Auth, RoomController.getMyGroups);
router.get('/room', RoomController.getGroupChats);
router.delete('/exit-room', Auth, RoomController.exitGroup);
router.get('/check-membership', Auth, RoomController.checkMembership);

export default router;
