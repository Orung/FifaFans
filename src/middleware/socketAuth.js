import { verifyToken } from '../utils/processToken';
import model from '../models';
import {sendErrorResponse, errorMsg} from "../utils/sendResponse";

const { User } = model;

const socketAuth = async (token, socket, io) => {
  try {
    if (!token) return errorMsg('Access denied', { status: 401 });
    const { email } = verifyToken(token);
    const user = await User.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
      // include: ['token'],
    });
    if (!user) return errorMsg('Account does not exist', { status: 404 });
    return user.dataValues;
  } catch (e) {
    console.log(e);
    io.to(socket.id).emit('login_error', {message:'Please login'});
  }
};

export {
  socketAuth,
};
